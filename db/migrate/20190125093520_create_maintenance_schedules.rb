class CreateMaintenanceSchedules < ActiveRecord::Migration[5.2]
  def change
    create_table :maintenance_schedules do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.datetime :start_time, null: false
      t.datetime :end_time, null: false

      t.timestamps
    end
  end
end
