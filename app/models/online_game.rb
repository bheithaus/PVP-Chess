p Dir.pwd

require './lib/chess/game.rb'

class OnlineGame < ActiveRecord::Base
  before_create :setup_board
  after_find :load_board
  attr_accessible :player_black_id, :player_white_id, :board
  
  def execute_move(from, to)
    @game
    
  end
  
  private
  
    def setup_board
      self.turn = player_white_id
      params = {} #{ player_white_id: @player_white_id, player_black_id: @player_white_id }perhaps optionally load in ids
      
      @game = Game.new(params)
      self.board = @game.board.to_text
    end
      
    def load_board 
      @game = Game.new(player_white_id: @player_white_id, player_black_id: @player_white_id)
      @game.turn = player_white_id
      @game.board.load_board(self.board)
    end
end