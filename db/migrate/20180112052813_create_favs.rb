class CreateFavs < ActiveRecord::Migration[5.1]
  def change
    create_table :favs do |t|
      t.references :user,  index: true, foreign_key: true
      t.references :score, index: true, foreign_key: true

      t.timestamps
    end
  end
end
