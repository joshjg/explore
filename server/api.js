/* eslint-disable func-names, no-shadow, prefer-arrow-callback */

require('dotenv').config();

import express from 'express';
import * as objection from 'objection';
import bcrypt from 'bcrypt';
import passport from 'passport';

import passportConfig from './passportConfig';
import { Photo, Event, Location, User } from './models';
import { userCanCreate } from './middleware';

const router = express.Router();

const userIsOwner = (user, location) => (
  !!user
    && !!location
    && !!location.owners
    && location.owners.indexOf(user.id) !== -1
);

const userIsAdmin = user => (user && user.admin);

router.use(passport.initialize());
router.use(passport.session());
passportConfig(passport);

const prefix = process.env.NODE_ENV === 'development' ? '' : '/api';

router.use(`${prefix}/s3`, userCanCreate, require('react-s3-uploader/s3router')({
  bucket: 'explorebucket01',
  headers: { 'Access-Control-Allow-Origin': '*' },
  ACL: 'private',
}));

/**
 * AUTH
 */
router.post(`${prefix}/signup`, async function (req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send('Invalid request');
  }
  const existingUser = await User
    .query()
    .where('email', req.body.email)
    .catch(err => console.error(err));
  if (existingUser.length) {
    return res.status(403).send('User already exists');
  }
  const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  const newUser = await User
    .query()
    .insert({
      email: req.body.email,
      password: hash,
      admin: false,
      canCreate: false,
    });
  req.login(newUser, (err) => {
    if (err) return next(err);
    return res.json({
      id: newUser.id,
      email: newUser.email,
      admin: newUser.admin,
      canCreate: newUser.canCreate,
    });
  });
});

router.post(`${prefix}/login`, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => { // eslint-disable-line consistent-return
    if (err) return next(err);
    if (!user) return res.json(info);
    req.login(user, (err) => {
      if (err) return next(err);
      req.session.save();
      return res.json(user);
    });
  })(req, res, next);
});

router.get(`${prefix}/auth`, (req, res) => res.json(req.user));

router.post(`${prefix}/logout`, (req, res) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(204);
});


/**
 * PUT
 */
router.put(`${prefix}/locations`, userCanCreate, async function (req, res) {
  const location = await Location
    .query()
    .insert(req.body);
  return res.json(location);
});

router.put(`${prefix}/locations/:id`, async function (req, res) {
  const location = await Location
    .query()
    .findById(req.params.id);
  if (!location) {
    return res.status(404).send('Not found');
  }
  if (userIsOwner(req.user, location) || userIsAdmin(req.user)) {
    const updatedLocation = await Location
      .query()
      .updateAndFetchById(req.params.id, req.body);
    return res.json(updatedLocation);
  }
  return res.status(403).send('Permission required');
});

router.put(`${prefix}/locations/:id/events`, async function (req, res) {
  const event = await objection.transaction(Location, async function (Location) {
    const location = await Location
      .query()
      .findById(req.params.id);
    if (!location) {
      return res.status(404).send('Not found');
    }
    return await location
      .$relatedQuery('events')
      .insert(req.body);
  });
  res.json(event);
});

router.put(`${prefix}/locations/:id/photos`, async function (req, res) {
  const photo = await objection.transaction(Location, async function (Location) {
    const location = await Location
      .query()
      .findById(req.params.id);
    if (!location) {
      return res.status(404).send('Not found');
    }
    return await location
      .$relatedQuery('photos')
      .insert(req.body);
  });
  res.json(photo); // TODO res already sent 404?
});

router.put(`${prefix}/users/:id`, async function (req, res) {
  const user = await User
    .query()
    .findById(req.params.id);
  if (!user) {
    return res.status(404).send('Not found');
  }
  if (userIsAdmin(req.user)) {
    const updatedUser = await User
      .query()
      .patchAndFetchById(req.params.id, req.body);
    return res.json(updatedUser);
  }
  return res.status(403).send('Permission required');
});


/**
 * DELETE
 */
router.delete(`${prefix}/locations/:id`, async function (req, res) {
  const location = await Location
    .query()
    .findById(req.params.id);
  if (!location) {
    return res.status(404).send('Not found');
  }
  if (userIsOwner(req.user, location) || userIsAdmin(req.user)) {
    await Location
      .query()
      .del()
      .where('id', req.params.id);
    return res.sendStatus(204);
  }
  return res.status(403).send('Permission required');
}); // TODO delete related

router.delete(`${prefix}/events/:id`, async function (req, res) {
  const event = await Event
    .query()
    .findById(req.params.id);
  if (!event) {
    return res.status(404).send('Event not found');
  }
  const location = await event
    .$relatedQuery('location');
  if (!location) {
    return res.status(404).send('Location not found');
  }
  if (userIsOwner(req.user, location) || userIsAdmin(req.user)) {
    await Event
      .query()
      .del()
      .where('id', req.params.id);
    return res.sendStatus(204);
  }
  return res.status(403).send('Permission required');
});

router.delete(`${prefix}/photos/:id`, async function (req, res) {
  const photo = await Photo
    .query()
    .findById(req.params.id);
  if (!photo) {
    return res.status(404).send('Photo not found');
  }
  const location = await photo
    .$relatedQuery('location');
  if (!location) {
    return res.status(404).send('Location not found');
  }
  if (userIsOwner(req.user, location) || userIsAdmin(req.user)) {
    await Photo
      .query()
      .del()
      .where('id', req.params.id);
    return res.sendStatus(204);
  }
  return res.status(403).send('Permission required');
});


/**
 * GET
 */
router.get(`${prefix}/locations/:id`, async function (req, res) {
  const location = await Location
    .query()
    .findById(req.params.id);
  if (!location) {
    return res.status(404).send('Not found');
  }
  return res.json(location);
});

router.get(`${prefix}/events/:id`, async function (req, res) {
  const event = await Event
    .query()
    .findById(req.params.id);
  if (!event) {
    return res.status(404).send('Not found');
  }
  return res.json(event);
});

router.get(`${prefix}/locations/:id/events`, async function (req, res) {
  const location = await Location
    .query()
    .findById(req.params.id);
  if (!location) {
    return res.status(404).send('Not found');
  }
  const events = await location.$relatedQuery('events');
  return res.json(events);
});

router.get(`${prefix}/locations/:id/photos`, async function (req, res) {
  const location = await Location
    .query()
    .findById(req.params.id);
  if (!location) {
    return res.status(404).send('Not found');
  }
  const photos = await location.$relatedQuery('photos');
  return res.json(photos);
});

router.get(`${prefix}/locations`, async function (req, res) {
  const locations = await Location
    .query();
  res.json(locations);
});

router.get(`${prefix}/users`, async function (req, res) {
  if (userIsAdmin(req.user)) {
    const users = await User
      .query();
    return res.json(users);
  }
  return res.status(403).send('Permission required');
});

export default router;
