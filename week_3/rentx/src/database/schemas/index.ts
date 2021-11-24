import { appSchema } from '@nozbe/watermelondb';

import { userSchema } from './userSchemas';

export const schemas = appSchema({
  version: 1,
  tables: [userSchema],
});
