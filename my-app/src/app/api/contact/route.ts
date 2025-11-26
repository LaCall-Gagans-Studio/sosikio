import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// フォームからの送信は通常「POST」メソッドを使います
export async function POST(request: Request) {
  try {
    // フォームから送られてきたデータを受け取る
    const body = await request.json()
    const { name, email, company, message } = body

    // 1. お名前.comのメールサーバー設定
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // .envから読み込む
      port: Number(process.env.SMTP_PORT),
      secure: true, // 465番ポート(SSL)の場合はtrue
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // 2. 送信するメールの内容
    const mailOptions = {
      from: `"SOSIKIO Web" <${process.env.MAIL_FROM}>`, // 送信元（自分のアドレス）
      to: process.env.MAIL_TO, // 送信先（管理者である自分のアドレス）
      replyTo: email, // 返信ボタンを押したときはお客様のアドレスへ
      subject: `【お問い合わせ】${name}様より`,
      text: `
        Webサイトからお問い合わせがありました。

        ■お名前: ${name}
        ■会社名: ${company || '（未入力）'}
        ■メール: ${email}
        
        ■本文:
        ${message}
      `,
    }

    // 3. 送信実行
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('メール送信エラー:', error)
    return NextResponse.json({ success: false, error: '送信に失敗しました' }, { status: 500 })
  }
}
