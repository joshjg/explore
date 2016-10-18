import { Model } from 'objection';
import path from 'path';

export default class Event extends Model {
  static tableName = 'Event';
  static jsonSchema = {
    type: 'object',
    required: ['name', 'date', 'locationId'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      description: { type: 'string' },
      date: { type: 'integer' },
      timeStart: { type: 'integer' },
      timeEnd: { type: 'integer' },
      locationId: { type: 'integer' },
    },
  };
  static relationMappings = {
    location: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, 'Location'),
      join: {
        from: 'Event.locationId',
        to: 'Location.id',
      },
    },
  };
}
