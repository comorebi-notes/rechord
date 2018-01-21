class AddCounterCacheToScore < ActiveRecord::Migration[5.1]
  def change
    add_column :scores, :views_count, :integer, default: 0
  end
end
