// src/collections/global/Overview.ts
import type { GlobalConfig } from 'payload'

export const Overview: GlobalConfig = {
  slug: 'overview',
  label: 'サービス概要',
  access: {
    read: () => true,
  },
  admin: { group: '静的コンテンツ' },
  fields: [
    {
      name: 'hero',
      label: 'ヒーローエリア',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'タイトル（例：組織を読み解き、翻訳する）※[[]]で黒背景、\nでスマホ時改行',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          label: 'サブコピー',
          type: 'textarea',
        },
        {
          name: 'mainLogo',
          label: 'メインロゴ画像',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'ctaPrimaryLabel',
          label: '主ボタンラベル',
          type: 'text',
          defaultValue: 'サービスを見る',
        },
        {
          name: 'ctaPrimaryHref',
          label: '主ボタンリンク先',
          type: 'text',
          defaultValue: '#about',
        },
        {
          name: 'ctaSecondaryLabel',
          label: 'サブボタンラベル',
          type: 'text',
          defaultValue: 'SOSIKIOを知る',
        },
        {
          name: 'ctaSecondaryHref',
          label: 'サブボタンリンク先',
          type: 'text',
          defaultValue: '/philosophy',
        },
      ],
    },

    {
      name: 'issueKeywords', // フィールド名
      label: '組織の課題キーワード一覧', // 管理画面での表示名
      type: 'array', // Arrayタイプにして、リストとして追加・削除を可能にする
      minRows: 1, // 最低1つは必要であれば設定
      fields: [
        {
          name: 'keyword',
          label: 'キーワード',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: '組織の課題を示すキーワードを自由に追加・編集できます。',
      },
    },

    {
      name: 'clientLogos',
      label: 'ロゴ一覧',
      type: 'array',
      fields: [
        { name: 'name', label: '企業名', type: 'text', required: true },
        {
          name: 'image',
          label: 'ロゴ画像',
          type: 'upload',
          relationTo: 'media',
          required: true, // ← 画像はメディアで
        },
      ],
    },

    {
      name: 'strengths',
      label: 'SOSIKIOだけの強み',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'アイコン',
          required: true,
          defaultValue: 'users',
          options: [
            { label: 'ユーザー', value: 'users' },
            { label: 'ターゲット', value: 'target' },
            { label: '上昇傾向', value: 'trendingUp' },
            { label: '棒グラフ', value: 'barChart2' },
            { label: 'レイヤー', value: 'layers' },
            { label: 'ザップ', value: 'zap' },
            { label: '脳回路', value: 'brainCircuit' },
            { label: 'ヘッドフォン', value: 'headphones' },
            { label: '再生サークル', value: 'playCircle' },
            { label: 'ブリーフケース', value: 'briefcase' },
          ],
          admin: {
            description: '一覧ページのアイコンに使用されます。',
          },
        },

        {
          name: 'badge',
          label: 'バッジ（例：安心・安全）',
          type: 'text',
        },
        {
          name: 'title',
          label: 'タイトル',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: '説明',
          type: 'textarea',
          required: true,
        },
        {
          name: 'points',
          label: '箇条書きポイント',
          type: 'array',
          fields: [
            {
              name: 'text',
              label: 'テキスト',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
