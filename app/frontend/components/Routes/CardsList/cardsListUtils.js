export const defaultSort = "created_at"

export const sortOptions = (type) => {
  switch (type) {
    case "scores":
      return [
        { value: "created_at",  label: "新着順" },
        { value: "title_asc",   label: "タイトル(昇順)" },
        { value: "title_desc",  label: "タイトル(降順)" },
        { value: "views_count", label: "閲覧回数順" },
        { value: "favs_count",  label: "いいね数順" }
      ]
    case "users":
      return [
        { value: "created_at",       label: "新着順" },
        { value: "screen_name_asc",  label: "名前(昇順)" },
        { value: "screen_name_desc", label: "名前(降順)" },
        { value: "scores_count",     label: "スコア数順" }
      ]
    default: return []
  }
}
