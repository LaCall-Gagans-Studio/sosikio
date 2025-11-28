// src/collections/Testimonials.ts
import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'お客様の声', plural: 'お客様の声' },
  admin: {
    useAsTitle: 'company',
    defaultColumns: ['company', 'name', 'date', 'products'],
    group: '更新コンテンツ',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'date',
      label: '公開日',
      type: 'date',
      required: true,
    },
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
      name: 'linkType',
      label: 'リンクタイプ',
      type: 'radio',
      options: [
        { label: '内部コンテンツ', value: 'internal' },
        { label: '外部リンク', value: 'external' },
      ],
      defaultValue: 'internal',
      admin: {
        layout: 'horizontal',
      },
    },
    {
      name: 'externalLink',
      label: '外部リンクURL',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.linkType === 'external',
      },
    },
    {
      name: 'content',
      label: '本文（リッチテキスト）',
      type: 'richText',
      admin: {
        condition: (_, siblingData) => siblingData?.linkType === 'internal',
      },
    },
  ],
}
