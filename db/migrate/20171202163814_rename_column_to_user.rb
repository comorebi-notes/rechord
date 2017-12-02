class RenameColumnToUser < ActiveRecord::Migration[5.1]
  def change
    rename_column :users, :icon_url, :icon
    rename_column :users, :site_url, :site
  end
end
