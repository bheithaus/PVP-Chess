class CreateDirectMessages < ActiveRecord::Migration
  def change
    create_table :direct_messages do |t|
      t.integer :from_user_id, null: false
      t.integer :to_user_id, null: false
      t.string :body

      t.integer :parent_message_id, null: false
      
      t.timestamps
    end
    
    add_index :direct_messages, :from_user_id
    add_index :direct_messages, :to_user_id
    add_index :direct_messages, :parent_message_id
  end
end
