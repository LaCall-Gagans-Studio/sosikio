// src/collections/Staff.ts
import type { CollectionConfig } from 'payload'

export const Staff: CollectionConfig = {
  slug: 'staff',
  labels: { singular: 'スタッフ', plural: 'スタッフ' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'updatedAt'],
    group: '静的コンテンツ',
  },
  access: { read: () => true },
  fields: [
    { name: 'name', label: '氏名', type: 'text', required: true },
    { name: 'role', label: '役割', type: 'text', required: true },
    { name: 'bio', label: '紹介文', type: 'textarea' },
    {
      name: 'avatar',
      label: 'アバター画像',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'links',
      label: 'リンク',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
  ],
}
