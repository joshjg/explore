/* eslint-disable func-names, prefer-arrow-callback */

import local from 'passport-local';
import * as objection from 'objection';
import bcrypt from 'bcrypt';
import { User } from './models';


export default (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    const user = await User
      .query()
      .findById(id);
    if (!user) {
      return done(null, false, { error: 'User not found.' });
    }
    return done(null, {
      id: user.id,
      email: user.email,
      admin: user.admin,
      canCreate: user.canCreate,
    });
  });

  passport.use(new local.Strategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async function (email, password, done) {
    const users = await User
      .query()
      .where('email', email);
    const user = users[0];
    if (!user) {
      return done(null, false, { error: 'User not found.' });
    } else if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, { error: 'Incorrect password.' });
    }
    return done(null, {
      id: user.id,
      email: user.email,
      admin: user.admin,
      canCreate: user.canCreate,
    });
  }));
};
