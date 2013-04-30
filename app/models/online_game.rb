p Dir.pwd

require './lib/chess/game.rb'

class OnlineGame < ActiveRecord::Base
  before_create :setup_board
  after_find :load_board
  before_save :board_to_text
  
  attr_accessible :player_black_id, :player_white_id, :board
  
  def execute_move(moves)
    @game.make_move(moves[:from], moves[:to])
  end
  
  private
  
    def setup_board
      params = {} #{ player_white_id: @player_white_id, player_black_id: @player_white_id }perhaps optionally load in ids
      
      @game = Game.new(params)
      self.board = @game.board.to_text
      self.turn = @game.turn
      self.player_white_id = @game.player_white_id
      self.player_black_id = @game.player_black_id
    end
      
    def load_board 
      @game = Game.new(player_white_id: @player_white_id, player_black_id: @player_white_id)
      @game.turn = player_white_id
      @game.board.load_board(self.board)
    end
    
    def board_to_text
      if persisted?
        self.board = @game.board.to_text
        self.turn = @turn
      end
    end
end