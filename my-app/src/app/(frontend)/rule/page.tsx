import React from 'react'

export const metadata = {
  title: '利用規約 | SOSIKIO',
  description: 'SOSIKIOの利用規約ページです。',
}

export default function RulePage() {
  return (
    <div className="bg-[#f1f1f1] min-h-screen py-20 px-4 sm:px-6 lg:px-8 font-zenKakuGothicNew text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center tracking-wider">利用規約</h1>
        
        <div className="space-y-8 leading-relaxed text-sm md:text-base">
          <section>
            <h2 className="text-xl font-bold mb-4 border-b pb-2 border-gray-200">第1条（適用）</h2>
            <p>
              本利用規約（以下「本規約」といいます。）は、SOSIKIO（以下「当社」といいます。）が提供するサービス（以下「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 border-b pb-2 border-gray-200">第2条（利用登録）</h2>
            <p>
              登録希望者が当社の定める方法によって利用登録を申請し、当社がこれを承認することによって、利用登録が完了するものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 border-b pb-2 border-gray-200">第3条（禁止事項）</h2>
            <p>ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
            <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>当社のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
              <li>当社のサービスの運営を妨害するおそれのある行為</li>
              <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 border-b pb-2 border-gray-200">第4条（本サービスの提供の停止等）</h2>
            <p>
              当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
              <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
              <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
              <li>コンピュータまたは通信回線等が事故により停止した場合</li>
              <li>その他、当社が本サービスの提供が困難と判断した場合</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-bold mb-4 border-b pb-2 border-gray-200">第5条（免責事項）</h2>
            <p>
              当社の債務不履行責任は、当社の故意または重過失によらない場合には免責されるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 border-b pb-2 border-gray-200">第6条（サービス内容の変更等）</h2>
            <p>
              当社は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 border-b pb-2 border-gray-200">第7条（利用規約の変更）</h2>
            <p>
              当社は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 border-b pb-2 border-gray-200">第8条（準拠法・裁判管轄）</h2>
            <p>
              本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
            </p>
          </section>
          
          <div className="mt-12 pt-8 border-t border-gray-200 text-right text-sm text-gray-500">
            <p>2024年11月26日 制定</p>
          </div>
        </div>
      </div>
    </div>
  )
}
