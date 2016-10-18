import { Model } from 'objection';
import path from 'path';

export default class Photo extends Model {
  static tableName = 'Photo';
  static jsonSchema = {
    type: 'object',
    required: ['url', 'locationId'],
    properties: {
      id: { type: 'integer' },
      url: { type: 'string' },
      caption: { type: 'string' },
      locationId: { type: 'integer' },
    },
  };
  static relationMappings = {
    location: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, 'Location'),
      join: {
        from: 'Photo.locationId',
        to: 'Location.id',
      },
    },
  };
}
