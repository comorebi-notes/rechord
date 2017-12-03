const keys = {
  score: {
    title:      "タイトル",
    content:    "スコア"
  },
  user: {
    name:       "ID",
    screenName: "名前",
    profile:    "プロフィール",
    icon:       "アイコン",
    site:       "サイトURL",
    twitter:    "Twitter ID "
  }
}

const errorKey = (error) => {
  switch (true) {
    case (/You are not allowed to upload .* files, allowed types: jpg, jpeg, gif, png/).test(error):
      return "wrong_extention"
    case (/.*maybe it is not an image\?/).test(error):
      return "not_image"
    default:
      return error
  }
}

const errors = {
  blank:     (key) => `${key}は必須項目です。`,
  too_long:  (key) => `${key}が長すぎます。`,
  taken:     (key) => `その${key}は既に使用されています。`,
  over_size: (key) => `${key}のファイルサイズは2MBが上限です。`,
  not_image: ()    => "画像ファイルではありません。",
  invalid_format:  (key) => `${key}のフォーマットが正しくありません。`,
  wrong_extention: (key) => `${key}は .png, .jpg, .jpeg, .gif のみが使用可能です。`,
}

export const translate = (target, key, error) => errors[errorKey(error)](keys[target][key])

export default translate
