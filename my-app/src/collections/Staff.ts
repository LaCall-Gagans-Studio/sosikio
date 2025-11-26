// src/collections/Staff.ts
import type { CollectionConfig } from 'payload'

export const Staff: CollectionConfig = {
  slug: 'staff',
  labels: { singular: 'スタッフ', plural: 'スタッフ' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'order', 'updatedAt'],
    group: '静的コンテンツ',
  },
  access: { read: () => true },
  fields: [
    { name: 'name', label: '氏名', type: 'text', required: true },
    { name: 'role', label: '役割', type: 'text', required: true },
    { name: 'bio', label: '紹介文', type: 'textarea' },
    { name: 'career', label: '経歴', type: 'textarea' },
    { name: 'vision', label: 'ビジョン', type: 'textarea' },
    { name: 'hobbies', label: '趣味', type: 'textarea' },
    { name: 'favoriteWords', label: '好きな言葉', type: 'textarea' },
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
    { name: 'order', label: '表示順', type: 'number', defaultValue: 0 },
  ],
  defaultSort: 'order',
}
