class AddColumnToScore < ActiveRecord::Migration[5.1]
  def change
    add_column :scores, :capo, :integer, default: 0
    add_column :scores, :loop, :boolean, default: false
  end
end
