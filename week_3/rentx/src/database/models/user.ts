import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class User extends Model {
  // Nome do nossa tabe e modelo
  static table = 'users';

  // Nome do campo na table
  @field('user_id')
  // nome do campo no model
  user_id!: string;

  @field('name')
  name!: string;

  @field('email')
  email!: string;

  @field('driver_license')
  driver_license!: string;

  @field('avatar')
  avatar!: string;

  @field('token')
  token!: string;
}
