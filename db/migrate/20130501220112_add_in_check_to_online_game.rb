class AddInCheckToOnlineGame < ActiveRecord::Migration
  def change
    add_column :online_games, :in_check, :boolean
  end
end