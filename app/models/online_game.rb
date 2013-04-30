p Dir.pwd

require './lib/chess/game.rb'

class OnlineGame < ActiveRecord::Base
  attr_accessible :player_black_id, :player_white_id, :board
  
  def self.new_game(params)
    puts "data"
    p params
    game = Game.new(params)
    online_game = OnlineGame.new(params)
    
    online_game.board = game.board.to_text
    online_game.turn = game.turn
    
    online_game
  end
  
  def execute_move(moves)
    game = Game.new(player_white_id: self.player_white_id, player_black_id: self.player_black_id)
    game.turn = self.turn
    game.board.load_board(self.board)
    
    game.make_move(moves)
    self.board = game.board.to_text
    self.turn = game.turn
  end
end