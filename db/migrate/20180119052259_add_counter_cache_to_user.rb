class AddCounterCacheToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :scores_count, :integer, default: 0
  end
end
