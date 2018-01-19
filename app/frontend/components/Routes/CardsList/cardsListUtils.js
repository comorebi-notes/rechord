export const defaultSortKey = "created_at"
export const defaultOrder   = "asc"

export const sortOptions = (type) => {
  switch (type) {
    case "scores":
      return [
        { value: "created_at",  label: "作成日時順" },
        { value: "title",       label: "タイトル順" },
        { value: "views_count", label: "閲覧回数順" },
        { value: "favs_count",  label: "いいね数順" }
      ]
    case "users":
      return [
        { value: "created_at",   label: "作成日時順" },
        { value: "screen_name",  label: "名前順" },
        { value: "scores_count", label: "スコア数順" }
      ]
    default: return []
  }
}

export const sortResult = (result, sortKey, order) => (
  result.sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return order === "asc" ? -1 : 1
    if (a[sortKey] > b[sortKey]) return order === "asc" ?  1 : -1
    return 0
  })
)
