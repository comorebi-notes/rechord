class CreateNotifications < ActiveRecord::Migration[5.2]
  def change
    create_table :notifications do |t|
      t.string  :title
      t.text    :content
      t.json    :params
      t.integer :template, default: 0
      t.integer :user_id,  index: true

      t.timestamps
    end

    add_column :users, :last_read_at, :timestamp
  end
end
