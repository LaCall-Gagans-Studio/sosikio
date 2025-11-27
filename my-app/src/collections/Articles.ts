// src/collections/Articles.ts
import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: { singular: 'コラム', plural: 'コラム' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'tags'],
    group: '更新コンテンツ',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      label: 'タイトル',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'スラッグ',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'isTopDisplay',
      label: 'トップに表示',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'category',
      label: 'カテゴリ',
      type: 'select',
      options: [
        { label: 'コラム', value: 'column' },
        { label: '展示会', value: 'exhibition' },
        { label: '製品情報', value: 'product_info' },
      ],
      defaultValue: 'column',
      required: true,
    },
    {
      name: 'date',
      label: '公開日',
      type: 'date',
      required: true,
    },
    {
      name: 'image',
      label: 'サムネイル画像',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'tags',
      label: 'タグ',
      type: 'array',
      labels: {
        singular: 'タグ',
        plural: 'タグ',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'excerpt',
      label: '抜粋',
      type: 'textarea',
      required: true,
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
