import React from "react"

const releases = [
  {
    version:    "v0.0.1",
    updated_at: "2017/12/8",
    content: (
      <ul>
        <li>サービス公開</li>
        <ul>
          <li>
            <a href="https://bit.ly/2HHOdjX" target="_blank" rel="noopener noreferrer">
              公開当時の記事
            </a>
          </li>
        </ul>
        <li>
          リリース開始から v1.0.0 まで、以下の変更を実施
          <ul>
            <li>比較的複雑なコードの表記に対応</li>
            <li>ユーザおよびスコアの検索機能を実装</li>
            <li>検索機能を実装</li>
            <li>いいね機能を実装</li>
            <li>いいねページ (My Fav) を実装</li>
          </ul>
        </li>
      </ul>
    )
  }, {
    version:    "v1.0.0",
    updated_at: "2018/1/23",
    content: (
      <ul>
        <li>更新履歴を作成開始</li>
        <li>スコアページの表示を調整し、表示数やいいね数を表示</li>
        <li>
          検索機能を改善
          <ul>
            <li>閲覧数・いいね数でソート可能に変更</li>
            <li>横幅が広い場合は2カラムで表示</li>
            <li>20件ごとにページを分割するように変更</li>
          </ul>
        </li>
      </ul>
    )
  }, {
    version:    "v1.0.1",
    updated_at: "2018/1/28",
    content: (
      <ul>
        <li>エディタ機能を改善
          <ul>
            <li>コードの表記に誤りがあり翻訳できない場合、赤文字でエラーを表示するように修正</li>
            <li>コードの表記に誤りがあり翻訳できない場合、再生や保存ができないように制御</li>
            <li>全角文字での入力に対応</li>
          </ul>
        </li>
        <li>翻訳機能を改善
          <ul>
            <li><code>C5</code>といった表記をパワーコードとして翻訳</li>
            <li><code>(omit3)</code>といった omit の括弧で表記可能に</li>
            <li><code>Bm7(b5)</code>といった5度の音の操作も括弧で表記可能に</li>
          </ul>
        </li>
        <li>ページを移動するたびにブラウザに負荷がかかっていたバグを修正</li>
      </ul>
    )
  }, {
    version:    "v1.0.2",
    updated_at: "2018/1/30",
    content: (
      <ul>
        <li>エディタ機能を改善
          <ul>
            <li>再生中の箇所が黄色で強調され、現在の位置が分かるように改善</li>
            <li>
              スペースを入力できないように変更
              <ul>
                <li>既に保存されたスコアもスペースは削除して表示される</li>
                <li>コメントには入力可能</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>スコア表示画面からスコア編集画面に行く際、既にコードを編集していた場合はそれが保持されるように変更</li>
        <li>翻訳機能を改善
          <ul>
            <li><code>C5omit5</code>のように音数が1つだけになってしまう場合はエラー表示に</li>
          </ul>
        </li>
      </ul>
    )
  }, {
    version:    "v1.0.3",
    updated_at: "2018/2/2",
    content: (
      <ul>
        <li>エディタ機能を改善
          <ul>
            <li>ループ再生機能を追加</li>
            <li>8分音符・16分音符の入力を可能に</li>
            <li>キーチェンジボタンのデザインが、矢印だけでは分かりにくかったのでラベルを追加して改善</li>
            <li>BPMの欄が空でも保存できてしまうバグを修正</li>
          </ul>
        </li>
      </ul>
    )
  }, {
    version:    "v1.0.4",
    updated_at: "2018/2/6",
    content: (
      <ul>
        <li>非対応ブラウザでアクセスした際にリダイレクトする URL が誤っていたため修正</li>
        <li>ログインしていない場合にスコアを保存しようとすると確認モーダルを表示</li>
        <li>Google アカウントで認証した場合、エラーが発生してしまう場合があるバグを修正</li>
        <li>ユーザ ID の変更時に<code>/</code>を入力するとエラーが発生するバグを修正</li>
      </ul>
    )
  }, {
    version:    "v1.0.5",
    updated_at: "2018/6/6",
    content: (
      <ul>
        <li>
          部分再生機能を実装
          <ul>
            <li><code>&lt;</code>で再生位置、<code>&gt;</code>で終了位置を指定</li>
          </ul>
        </li>
        <li>ログインしていない時に my page 等からログインモーダルを表示すると、テキストが折り返さずはみ出してしまっていたのを修正</li>
      </ul>
    )
  }, {
    version:    "v1.0.6",
    updated_at: "2018/6/8",
    content: (
      <ul>
        <li>使用しているライブラリのバージョンを大きくアップグレード (動作には影響なし)</li>
        <li>ログイン状態の保持方法を変更し、新機能をリリースするたびに全ユーザがログアウトされてしまう問題を修正</li>
        <li>新しいバージョンの Chrome で音が鳴らないことがある問題を修正</li>
      </ul>
    )
  }, {
    version:    "v1.0.7",
    updated_at: "2018/6/9",
    content: (
      <ul>
        <li>検索機能に脆弱性になり得る実装があったため修正</li>
        <li>ログインしようとして認証画面でキャンセルするとエラーが発生してしまっていたのを修正</li>
        <li>ユーザとスコアにそれぞれ更新順での検索を実装</li>
      </ul>
    )
  }, {
    version:    "v1.0.8",
    updated_at: "2018/6/10",
    content: (
      <ul>
        <li>データベースの日次バックアップを実装 (7日間保持)</li>
        <li>サーバのログの日次バックアップを実装 (7日間保持)</li>
        <li>別のタブでログアウトした後、元のタブで操作するとエラーが発生する問題を修正</li>
      </ul>
    )
  }, {
    version:    "v1.0.9",
    updated_at: "2018/6/12",
    content: (
      <ul>
        <li>ユーザページのスコア一覧でソート順の指定が正常に機能しない不具合を修正</li>
      </ul>
    )
  }, {
    version:    "v1.0.10",
    updated_at: "2018/7/3",
    content: (
      <ul>
        <li>お知らせ通知機能を実装</li>
        <li>更新履歴ページ (Changelog) を追加</li>
        <li>スコアのページが Google 検索に表示されるよう改善</li>
        <li>各種ラベルの先頭を大文字に変更</li>
        <li>Share ボタンのレイアウトを調整</li>
        <li>Private に設定されているスコアは、Share ボタンが押せないように変更</li>
        <li>新規訪問時に、サンプルスコアがロードされていても再生ボタンが非活性になってしまう不具合を修正</li>
        <li>iOS からの閲覧時に、ログインモーダルが最前面に表示されない場合がある不具合を修正</li>
      </ul>
    )
  }, {
    version:    "v1.0.11",
    updated_at: "2018/8/31",
    content: (
      <ul>
        <li>日本語部分のフォントを変更</li>
        <li>スコアの Private 設定が非公開である、ということが分かりにくかったので表現を改善</li>
        <li>タブレットサイズでレイアウトが崩れていたので修正</li>
        <li>ゲストユーザのスコアをいいねすると全員に通知が行ってしまっていたので修正 </li>
      </ul>
    )
  }, {
    version:    "v1.1.0",
    updated_at: "2019/1/27",
    content: (
      <ul>
        <li>
          <strong>
            <a href="https://cloudgarage.jp/" target="_blank" rel="noopener noreferrer">CloudGarage</a>
            様の
            <a href="https://cloudgarage.jp/dap/" target="_blank" rel="noopener noreferrer">Dev Assist Program</a>
            にて無償提供されるサーバへ移行が完了しました！
          </strong>
          <br />
          これで以前より懸念だったサーバ費用の問題が解決するため、開発を継続することができます。
        </li>
        <li>開発環境周りを大幅に改善</li>
        <li>Twitter のハッシュタグをタイムラインしていた箇所が、Twitter 側の仕様変更により使用不可になっていたため削除</li>
        <li>Google 認証でアカウント作成した際、表示名が長すぎたらエラーになる問題を修正</li>
      </ul>
    )
  }, {
    version:    "v1.1.1",
    updated_at: "2019/1/28",
    content: (
      <ul>
        <li><code>&lt;|</code> と入力するとエラーになるバグを修正</li>
        <li>タブレットでの表示を大幅に改善</li>
      </ul>
    )
  }, {
    version:    "v1.1.2",
    updated_at: "2019/1/29",
    content: (
      <ul>
        <li>Google 認証でログインしようとするとエラーになっていたのを修正</li>
      </ul>
    )
  }, {
    version:    "v1.1.3",
    updated_at: "2019/3/7",
    content: (
      <ul>
        <li>Google 認証の古い方式が使用不可になるため、方式を最新化</li>
      </ul>
    )
  }, {
    version:    "v1.1.4",
    updated_at: "2019/12/8",
    content: (
      <ul>
        <li>rechordが稼働するクラウドサービスを移行</li>
        <li>日本語名のソート順が正しくなかった不具合を修正</li>
      </ul>
    )
  }, {
    version:    "v1.1.5",
    updated_at: "2020/1/28",
    content: (
      <ul>
        <li>Facebook の API をバージョンアップ</li>
      </ul>
    )
  }, {
    version:    "v1.1.6",
    updated_at: "2021/2/5",
    content: (
      <ul>
        <li>サーバが起動できない問題を修正</li>
      </ul>
    )
  }
]

export default releases
