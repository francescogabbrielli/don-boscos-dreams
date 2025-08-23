import { defineFunction } from '@aws-amplify/backend';

export const importJSON = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'import JSON',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts'
});