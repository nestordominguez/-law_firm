class AddPriorityToPage < ActiveRecord::Migration
  def change
    add_column :pages, :priority, :integer
  end
end
