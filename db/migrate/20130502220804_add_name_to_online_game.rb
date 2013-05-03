class AddNameToOnlineGame < ActiveRecord::Migration
  def change
    add_column :online_games, :name, :string
  end
end
