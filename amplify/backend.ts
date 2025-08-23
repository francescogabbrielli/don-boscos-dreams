import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { importJSON } from './functions/import/resource';

defineBackend({
  auth,
  data,
  importJSON
});
