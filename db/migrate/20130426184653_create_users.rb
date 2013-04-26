class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :fname, null: false
      t.string :lname, null: false
      t.string :username, null: false
      t.string :email, null: false
      t.date :birth_date, null: false
      
      t.timestamps
    end
    
    add_index :users, [:fname, :lname, :username, :email]
    add_index :users, :username, unique: true
    add_index :users, :email, unique: true
  end
end
