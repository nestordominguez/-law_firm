class AddAdminToUsers < ActiveRecord::Migration
  def change
    add_column :users, :lawyer, :boolean, :default => false
    add_column :users, :superuser, :boolean, :default => false
  end
end
