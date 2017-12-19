export const defaultSortKey = "updated_at"
export const defaultOrder   = "desc"

export const sortOptions = (type) => {
  switch (type) {
    case "scores":
      return [
        { value: "title",      label: "タイトル順" },
        { value: "created_at", label: "作成日時順" },
        { value: "updated_at", label: "更新日時順" }
      ]
    case "users":
      return [
        { value: "screen_name",  label: "名前順" },
        { value: "scores_count", label: "スコア数順" },
        { value: "created_at",   label: "作成日時順" },
        { value: "updated_at",   label: "更新日時順" }
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
