// src/collections/Timeline.ts
import type { CollectionConfig } from 'payload'

export const Timeline: CollectionConfig = {
  slug: 'timeline',
  labels: { singular: '沿革項目', plural: '沿革' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['year', 'month', 'title', 'order', 'updatedAt'],
    group: '静的コンテンツ',
  },
  access: { read: () => true },
  fields: [
    { name: 'year', label: '年', type: 'text', required: true },
    { name: 'month', label: '月', type: 'text' },
    { name: 'title', label: 'タイトル', type: 'text', required: true },
    { name: 'detail', label: '詳細', type: 'textarea' },
    { name: 'order', label: '表示順', type: 'number', defaultValue: 0 },
  ],
  defaultSort: 'order',
}
