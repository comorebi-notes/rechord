const keys = {
  title:      "タイトル",
  content:    "スコア",
  name:       "ID",
  screenName: "名前",
  profile:    "プロフィール",
  icon:       "アイコンURL",
  site:       "サイトURL"
}

const errors = {
  blank:    "は必須項目です。",
  too_long: "が長すぎます。"
}

export const translate = (key, error) => `${keys[key]}${errors[error]}`

export default translate
