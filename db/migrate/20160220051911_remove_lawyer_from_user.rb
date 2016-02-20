class RemoveLawyerFromUser < ActiveRecord::Migration
  def change
    remove_column :users, :lawyer, :boolean
  end
end
