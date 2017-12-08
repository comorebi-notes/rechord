import React, { PureComponent } from "react"

export default class PrivacyPolicy extends PureComponent {
  render() {
    return (
      <div className="content is-size-7" style={{ lineHeight: "1.8" }}>
        <h1>プライバシーポリシー</h1>

        <h2>Google Analyticsについて</h2>
        <p>rechord (以下、本サービス) では、サイトのサービスの分析と改善のために Google アナリティクスを使用しています。</p>
        <p>
          本サイトをご利用中のウェブブラウザは、
          Google に特定の情報（たとえば、アクセスしたページのウェブ アドレスや IP アドレスなど）を自動的に送信します
          また、データ収集のため、Google がお使いのブラウザに cookie を設定したり、既存の cookie を読み取ったりすることがあります。
          利用者は、本サイトを利用することで、上記方法および目的において、Google が行うこうしたデータ処理につき許可を与えたものとみなします。
        </p>
        <p>
          <a href="https://www.google.com/policies/privacy/partners/" target="_blank" rel="noopener noreferrer">
            Google のプライバシーポリシーについてはこちらをご覧ください。
          </a>
        </p>

        <h2>Google AdSenseについて</h2>
        <p>本サービスでは、Google AdSense を使用しています。</p>
        <p>
          本サービスの Google AdSense による広告においては、Google などの第三者配信事業者が cookie を使用して、
          利用者が本サービスや他のウェブサイトに過去にアクセスした際の情報に基づいて広告を配信します。
          そして Google が広告 cookie を使用することにより、利用者が本サービスや他のウェブサイトにアクセスした際の情報に基づいて、
          Google やそのパートナーが適切な広告を利用者に表示することができます。
          Google によるこれらのパーソナライズ広告は、利用者の判断で停止することができます。
          停止を希望される方は、
          <a href="https://adssettings.google.com/authenticated" target="_blank" rel="noopener noreferrer">
            Google の広告設定
          </a>
          から無効にしてください。
        </p>
        <p>
          <a href="https://www.google.co.jp/policies/technologies/ads/" target="_blank" rel="noopener noreferrer">
            Google の広告に関するプライバシーポリシーについてはこちらをご覧ください。
          </a>
        </p>
      </div>
    )
  }
}
