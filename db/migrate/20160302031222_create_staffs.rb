class CreateStaffs < ActiveRecord::Migration
  def change
    create_table :staffs do |t|
      t.string :names
      t.string :last_name
      t.string :email
      t.integer :phone,:limit => 10
      t.integer :cel,:limit => 10
      t.text :address
      t.integer :number
      t.integer :code
      t.text :cv

      t.timestamps null: false
    end
  end
end
