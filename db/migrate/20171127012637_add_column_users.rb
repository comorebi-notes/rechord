class AddColumnUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :screen_name, :string
    add_column :users, :profile,     :text
    add_column :users, :site_url,    :string
    add_column :users, :admin,       :boolean, default: false
    add_index  :users, :name
  end
end
