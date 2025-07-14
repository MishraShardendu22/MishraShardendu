import { type SchemaTypeDefinition } from 'sanity'
import { playlist } from './playlist'
import { author } from './author'
import { startup } from './startup'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author,playlist,startup],
}
