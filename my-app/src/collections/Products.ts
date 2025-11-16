// src/collections/Products.ts
import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'プロダクト', plural: 'プロダクト' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['productId', 'name', 'tagline', 'updatedAt'],
    group: '静的コンテンツ',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'order',
      label: '表示順',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: '小さいほど上に表示されます',
      },
    },
    {
      name: 'productId',
      label: 'プロダクトID',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: '※変更注意。一意な文字を入力してください',
      },
    },
    {
      name: 'name',
      label: '表示名（例：SOSIKIO.LOOK）',
      type: 'text',
      required: true,
    },
    {
      name: 'tagline',
      label: 'タグライン（日）',
      type: 'text',
      required: true,
    },
    {
      name: 'tagline_en',
      label: 'タグライン（英）',
      type: 'text',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'logo',
          label: 'ロゴ（正方形など）',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'logo_long',
          label: '横長ロゴ',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'catchphrase',
      label: 'キャッチコピー',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: '説明文',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      label: 'メイン画像',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    // カラー類は今までの class 名をそのまま文字列で持つ
    {
      name: 'mainColor',
      label: 'メインカラー',
      type: 'text',
      required: true,
      defaultValue: '#5bb5c3',
    },
    {
      name: 'subColor',
      label: 'サブカラー',
      type: 'text',
      required: true,
      defaultValue: '#5bb5c3',
    },

    // ---- about.main ----
    {
      type: 'group',
      name: 'about',
      label: 'About セクション',
      fields: [
        {
          type: 'group',
          name: 'main',
          label: 'メインメッセージ',
          fields: [
            {
              name: 'heading_jp',
              label: '見出し（日）',
              type: 'text',
              required: true,
            },
            {
              name: 'heading_en',
              label: '見出し（英）',
              type: 'text',
            },
            {
              name: 'text',
              label: '本文',
              type: 'textarea',
              required: true,
            },
          ],
        },

        // ---- about.process ----
        {
          type: 'group',
          name: 'process',
          label: 'プロセス',
          fields: [
            {
              name: 'title_jp',
              label: 'セクションタイトル（日）',
              type: 'text',
              required: true,
            },
            {
              name: 'title_en',
              label: 'セクションタイトル（英）',
              type: 'text',
            },
            {
              name: 'steps',
              label: 'ステップ',
              type: 'array',
              minRows: 1,
              fields: [
                {
                  name: 'icon',
                  label: 'アイコン',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Layers', value: 'layers' },
                    { label: 'TrendingUp', value: 'trendingUp' },
                    { label: 'Zap', value: 'zap' },
                    { label: 'PlayCircle', value: 'playCircle' },
                    { label: 'BrainCircuit', value: 'brainCircuit' },
                    { label: 'Headphones', value: 'headphones' },
                    { label: 'BarChart2', value: 'barChart2' },
                    { label: 'Users', value: 'users' },
                    { label: 'Target', value: 'target' },
                    { label: 'Briefcase', value: 'briefcase' },
                  ],
                },
                {
                  name: 'title_jp',
                  label: 'タイトル（日）',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'title_en',
                  label: 'タイトル（英）',
                  type: 'text',
                },
                {
                  name: 'description',
                  label: '説明',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },

        // ---- about.features ----
        {
          type: 'group',
          name: 'features',
          label: '機能 / 提供価値',
          fields: [
            {
              name: 'title_jp',
              label: 'セクションタイトル（日）',
              type: 'text',
              required: true,
            },
            {
              name: 'title_en',
              label: 'セクションタイトル（英）',
              type: 'text',
            },
            {
              name: 'items',
              label: '項目',
              type: 'array',
              minRows: 1,
              fields: [
                {
                  name: 'icon',
                  label: 'アイコン',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'BarChart2', value: 'barChart2' },
                    { label: 'Users', value: 'users' },
                    { label: 'Headphones', value: 'headphones' },
                    { label: 'TrendingUp', value: 'trendingUp' },
                    { label: 'Target', value: 'target' },
                    { label: 'Briefcase', value: 'briefcase' },
                  ],
                },
                {
                  name: 'title_jp',
                  label: 'タイトル（日）',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'title_en',
                  label: 'タイトル（英）',
                  type: 'text',
                },
                {
                  name: 'description',
                  label: '説明',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'image',
                  label: '画像',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },

        // ---- about.cta ----
        {
          type: 'group',
          name: 'cta',
          label: 'CTA',
          fields: [
            {
              name: 'title_jp',
              label: 'タイトル（日）',
              type: 'text',
              required: true,
            },
            {
              name: 'title_en',
              label: 'タイトル（英）',
              type: 'text',
            },
            {
              name: 'description',
              label: '本文',
              type: 'textarea',
              required: true,
            },
            {
              name: 'buttonText',
              label: 'ボタン文言',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
