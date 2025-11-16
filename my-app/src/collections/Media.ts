import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'メディア', plural: 'メディア' },
  access: {
    read: () => true,
  },
  admin: { group: '更新コンテンツ' },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
