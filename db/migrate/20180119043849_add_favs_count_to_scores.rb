class AddFavsCountToScores < ActiveRecord::Migration[5.1]
  def self.up
    add_column :scores, :favs_count, :integer, null: false, default:  0
  end

  def self.down
    remove_column :scores, :favs_count
  end
end
