export const sortOptions = (type) => {
  switch (type) {
    case "scores":
      return [
        { value: "",            label: "新着順" },
        { value: "title_asc",   label: "タイトル(昇順)" },
        { value: "title_desc",  label: "タイトル(降順)" },
        { value: "views_count", label: "閲覧回数順" },
        { value: "favs_count",  label: "いいね数順" }
      ]
    case "favs":
      return [
        { value: "",            label: "新着順" },
        { value: "title_asc",   label: "タイトル(昇順)" },
        { value: "title_desc",  label: "タイトル(降順)" },
        { value: "views_count", label: "閲覧回数順" },
        { value: "favs_count",  label: "いいね数順" }
      ]
    case "users":
      return [
        { value: "",                 label: "新着順" },
        { value: "screen_name_asc",  label: "名前(昇順)" },
        { value: "screen_name_desc", label: "名前(降順)" },
        { value: "scores_count",     label: "スコア数順" }
      ]
    default: return []
  }
}

export const setDefault = (_query, type) => {
  const query = _query
  switch (type) {
    case "scores":
      if (!query.word)  query.word  = ""
      if (!query.guest) query.guest = "true"
      return query
    case "favs":
      if (!query.word) query.word  = ""
      return query
    case "users":
      if (!query.word)      query.word      = ""
      if (!query.no_scores) query.no_scores = "true"
      return query
    default:
      return query
  }
}
