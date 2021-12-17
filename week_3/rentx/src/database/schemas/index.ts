import { appSchema } from '@nozbe/watermelondb';

import { userSchema } from './userSchemas';
import { carSchema } from './carSchemas';

export const schemas = appSchema({
  version: 2,
  tables: [userSchema, carSchema],
});
