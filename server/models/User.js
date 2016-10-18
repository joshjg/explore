import { Model } from 'objection';

export default class User extends Model {
  static tableName = 'User';
  static jsonSchema = {
    type: 'object',
    required: ['email', 'password', 'admin', 'canCreate'],
    properties: {
      id: { type: 'integer' },
      email: { type: 'string' },
      password: { type: 'string' },
      admin: { type: 'boolean' },
      canCreate: { type: 'boolean' },
    },
  }
}
