class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :player_white_id
      t.integer :player_black_id
      t.integer :winner_id
      t.integer :current_player_id
      t.text :board
      t.integer :winner_id

      t.timestamps
    end
  end
end
