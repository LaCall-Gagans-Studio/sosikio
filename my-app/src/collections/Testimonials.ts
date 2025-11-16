// src/collections/Testimonials.ts
import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'お客様の声', plural: 'お客様の声' },
  admin: {
    useAsTitle: 'company',
    defaultColumns: ['company', 'name', 'products'],
    group: '更新コンテンツ',
  },
  fields: [
    {
      name: 'quote',
      label: 'コメント',
      type: 'textarea',
      required: true,
    },
    {
      name: 'name',
      label: '氏名',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      label: '役職',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      label: '会社名',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      label: 'ロゴ画像',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'avatar',
      label: '顔写真',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'products',
      label: 'プロダクト',
      type: 'select',
      hasMany: true,
      required: true,
      options: [
        { label: 'LOOK', value: 'LOOK' },
        { label: 'PROBE', value: 'PROBE' },
        { label: 'BOON', value: 'BOON' },
      ],
    },
    {
      name: 'content',
      label: '本文（リッチテキスト）',
      type: 'richText',
      required: true,
    },
  ],
}
