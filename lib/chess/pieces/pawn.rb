# encoding: utf-8

class Pawn < Piece
  attr_reader :forward
  
  def initialize(board, color, pos)
    super(board, color, pos)
    @forward = self.color == :white ? -1 : 1
  end

  def moves
    forward_moves + diag_moves
  end
  
  def forward_moves
    #shoot dang! How to make a method respond differently only the first time you call it?
    unless ( already_moved )
      already_moved = true
      forward_moves = [
        [forward, 0],
        [2*forward, 0]
      ]
    else
      forward_moves = [
        [forward, 0]
      ]
    end
    
    return [] if blocked?(forward_moves[0])
    
    forward_moves
  end
  
  def blocked?(pos)
    return false unless self.game[pos]
    
    self.game[pos].color == self.color
  end
  
  def diag_moves
    diag_moves = []
    corners = [1,-1].map { |dir| add_delta(pos, [forward, dir]) }
    corners.each do |corner|
      if game[corner] != null && game[corner].color != self.color
        diag_moves << corner
      end
    end
    
    diag_moves
  end
  
  def add_delta(position, delta)
    pos = position.dup
    pos[0] += delta[0]
    pos[1] += delta[1]
    
    pos
  end
  
	def symbol
		["♙", "♟"]
	end
end