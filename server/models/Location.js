import { Model } from 'objection';
import path from 'path';

export default class Location extends Model {
  static tableName = 'Location';
  static jsonSchema = {
    type: 'object',
    required: ['name', 'lat', 'lng'],
    properties: {
      id: { type: 'integer' },
      owners: {
        type: 'array',
        items: {
          type: 'number',
        },
      },
      name: { type: 'string' },
      description: { type: ['string', 'null'] },
      categories: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      logo: { type: ['string', 'null'] },
      lat: { type: 'number' },
      lng: { type: 'number' },
      address: {
        type: 'object',
        properties: {
          street: { type: 'string' },
          city: { type: 'string' },
          zip: { type: 'string' },
        },
      },
      email: { type: ['string', 'null'] },
      website: { type: ['string', 'null'] },
      contactName: { type: ['string', 'null'] },
      phone: { type: ['string', 'null'] },
    },
  };
  static relationMappings = {
    photos: {
      relation: Model.HasManyRelation,
      modelClass: path.join(__dirname, 'Photo'),
      join: {
        from: 'Location.id',
        to: 'Photo.locationId',
      },
    },
    events: {
      relation: Model.HasManyRelation,
      modelClass: path.join(__dirname, 'Event'),
      join: {
        from: 'Location.id',
        to: 'Event.locationId',
      },
    },
  };
}
