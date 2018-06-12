import React     from "react"
// import * as path from "../utils/path"

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
            <li>いいねページ (My Favs) を実装</li>
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
        <li>いいねページ (My Favs) を実装</li>
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
            <li><code>(omit3)</code>といった omit の括弧付き表記が可能に変更</li>
            <li><code>Bm7(b5)</code>といった5度の音の操作も括弧内で可能に変更</li>
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
        <li>再生中の箇所が黄色で強調され、現在の位置が分かるように改善</li>
        <li>スコア表示画面からスコア編集画面に行く際、既にコードを編集していた場合はそれが保持されるように変更</li>
        <li>
          エディタでスペースを入力できないように変更
          <ul>
            <li>既に保存されたスコアもスペースは削除して表示される</li>
            <li>コメントにはスペース入力可能</li>
          </ul>
        </li>
        <li>翻訳機能を改善
          <ul>
            <li><code>C5omit5</code>のように音数が1つだけになってしまう場合はエラー表示にする</li>
          </ul>
        </li>
      </ul>
    )
  }
]

export default releases
