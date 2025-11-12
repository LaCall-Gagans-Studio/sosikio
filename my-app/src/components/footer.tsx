import React from 'react'

export async function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold">SOSIKIO</h3>
            <p className="mt-2 text-gray-400">組織は 変化する時だ。</p>
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold tracking-wider">Products</h4>
                <ul className="mt-4 space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      SOSIKIO.LOOK
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      SOSIKIO.LISTEN
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      SOSIKIO.BOON
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold tracking-wider">Company</h4>
                <ul className="mt-4 space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      会社概要
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      お問い合わせ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      資料請求
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold tracking-wider">Legal</h4>
                <ul className="mt-4 space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      プライバシーポリシー
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} HOKURYO DENKO Corp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
