# t.integer  "player_white_id"
# t.integer  "player_black_id"
# t.integer  "winner_id"
# t.integer  "current_player_id"
# t.text     "board"
# t.datetime "created_at",        :null => false
# t.datetime "updated_at",        :null => false

class Game < ActiveRecord::Base
  attr_accessor :board, :player_white_id, :player_black_id,
                :winner_id, :current_player_id
#  attr_accessible
  serialize :board
  
  
  def self.new_game(options = {})
    game = Game.new
    game.player_white_id = options.player_white_id
    game.player_black_id = options.player_black_id    
  end
  
  def initialize
    @board = new Array([nil] * 8)
  end
  

  
  def move(from, to)
    #validate in bounds and valid move
    self[to] = self[from]
    self[from] = nil
  end
  
  
  
  
 private 
  
  def [](pos)
    x, y = pos
    
    self.board[x][y]
  end
  
  def []=(pos, value)
    x, y = pos
    self.board[x][y] = value
  end
end
