class CreateScores < ActiveRecord::Migration[5.1]
  def change
    create_table :scores do |t|
      t.string     :title,   null: false
      t.text       :comment
      t.text       :content, null: false
      t.integer    :status,  default: 0, null: false
      t.string     :token
      t.references :user,    foreign_key: true

      t.timestamps
    end
  end
end
