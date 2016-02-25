class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.text :content
      t.string :read, :default => "No"

      t.timestamps null: false
    end
  end
end
