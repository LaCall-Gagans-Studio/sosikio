// src/collections/Users.ts
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'ユーザー管理',
    plural: 'ユーザー管理',
  },
  admin: {
    useAsTitle: 'email',
    group: '設定',
    description: 'サイト管理用ユーザーアカウント',
    defaultColumns: ['email', 'role', 'updatedAt'],
  },
  auth: true,

  fields: [
    // ロール（管理者以外は変更不可）
    {
      name: 'role',
      label: '権限ロール',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: '管理者', value: 'admin' },
        { label: '編集者', value: 'editor' },
      ],
      admin: {
        description: '管理者以外変更できません',
      },
      access: {
        // role を更新できるのは admin だけ
        update: ({ req }) => {
          const user = req.user as any | undefined
          return !!user && user.role === 'admin'
        },
      },
    },

    // 任意の表示名
    {
      name: 'name',
      label: '表示名',
      type: 'text',
    },
  ],

  // アクセスコントロール
  access: {
    // 読み取り: admin は全員 / それ以外は自分だけ
    read: ({ req }) => {
      const user = req.user as any | undefined
      if (!user) return false
      if (user.role === 'admin') return true
      return {
        id: {
          equals: user.id,
        },
      }
    },

    // 作成: admin のみ
    create: ({ req }) => {
      const user = req.user as any | undefined
      return !!user && user.role === 'admin'
    },

    // 更新: admin か 自分自身
    update: ({ req }) => {
      const user = req.user as any | undefined
      if (!user) return false
      if (user.role === 'admin') return true
      return {
        id: {
          equals: user.id,
        },
      }
    },

    // 削除: admin のみ
    delete: ({ req }) => {
      const user = req.user as any | undefined
      return !!user && user.role === 'admin'
    },
  },

  // 念のためのダブルチェック（API直叩きで role を送られても保護）
  hooks: {
    beforeChange: [
      ({ req, data, originalDoc }) => {
        const user = req.user as any | undefined
        if (!user) return data

        // admin 以外が更新 → role を元の値に固定
        if (user.role !== 'admin' && originalDoc) {
          if ('role' in data) {
            ;(data as any).role = (originalDoc as any).role
          }
        }

        return data
      },
    ],
  },
}
