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
      name: 'content',
      label: '本文（リッチテキスト）',
      type: 'richText',
      required: true,
    },
    // もし「トップ表示用おすすめ」フラグ欲しければ
    // {
    //   name: 'featured',
    //   label: 'トップに表示',
    //   type: 'checkbox',
    //   defaultValue: false,
    // },
  ],
}
