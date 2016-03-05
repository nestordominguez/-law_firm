class CreateStaffs < ActiveRecord::Migration
  def change
    create_table :staffs do |t|
      t.string :names
      t.string :last_name
      t.string :email
      t.string :phone
      t.string :cel
      t.text :address
      t.integer :number
      t.integer :code
      t.text :cv

      t.timestamps null: false
    end
  end
end
