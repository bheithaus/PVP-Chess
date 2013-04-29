class CreateOnlineGames < ActiveRecord::Migration
  def change
    create_table :online_games do |t|
      t.integer :player_white_id
      t.integer :black_black_id
      t.integer :turn
      t.text :board

      t.timestamps
    end
  end
end
