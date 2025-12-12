// src/globals/Philosophy.ts
import type { GlobalConfig } from 'payload'

export const Philosophy: GlobalConfig = {
  slug: 'philosophy',
  label: '理念 / 率いる人',
  access: { read: () => true },
  admin: { group: '静的コンテンツ' },
  fields: [
    {
      name: 'vision',
      label: 'ビジョン',
      type: 'group',
      fields: [
        {
          name: 'tagline',
          label: 'タグライン ※[[]]で黒背景、\nでスマホ時改行',
          type: 'text',
          required: true,
        },
        { name: 'lead', label: 'リード', type: 'textarea', required: true },
      ],
    },
    {
      name: 'representatives',
      label: '率いる人',
      type: 'array',
      fields: [
        { name: 'name', label: '氏名', type: 'text', required: true },
        { name: 'title', label: '肩書', type: 'text', required: true },
        {
          name: 'avatar',
          label: '顔写真',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        { name: 'greeting', label: '挨拶文', type: 'textarea', required: true },
      ],
    },
  ],
}
