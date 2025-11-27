// src/globals/RelatedCompany.ts
import type { GlobalConfig } from 'payload'

export const RelatedCompany: GlobalConfig = {
  slug: 'related-company',
  label: '関連会社情報',
  access: { read: () => true },
  admin: { group: '静的コンテンツ' },
  fields: [
    { name: 'name', label: '社名', type: 'text', required: true },
    {
      name: 'logo',
      label: 'ロゴ',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    { name: 'url', label: '公式URL', type: 'text', required: true },
    { name: 'description', label: '説明', type: 'textarea' },
    { name: 'established', label: '設立', type: 'text' },
    { name: 'capital', label: '資本金', type: 'text' },
    { name: 'motto', label: '社是', type: 'text' },
    { name: 'employees', label: '従業員数', type: 'text' },
    {
      name: 'bases',
      label: '主な拠点情報',
      type: 'array',
      fields: [{ name: 'name', label: '拠点名', type: 'text', required: true }],
    },
    {
      name: 'businesses',
      label: '主な事業領域',
      type: 'array',
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    {
      name: 'offices',
      label: '拠点',
      type: 'array',
      fields: [
        { name: 'label', label: '拠点名', type: 'text', required: true },
        { name: 'address', label: '住所', type: 'textarea', required: true },
        { name: 'tel', label: 'TEL', type: 'text' },
        { name: 'fax', label: 'FAX', type: 'text' },
        { name: 'mapEmbedUrl', label: 'Google Map 埋め込みURL', type: 'text' },
      ],
    },
  ],
}
