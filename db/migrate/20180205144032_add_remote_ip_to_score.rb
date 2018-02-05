class AddRemoteIpToScore < ActiveRecord::Migration[5.1]
  def change
    add_column :scores, :remote_ip, :string
  end
end
