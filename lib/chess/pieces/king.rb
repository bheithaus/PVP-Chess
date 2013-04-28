# encoding: utf-8

class King < SlidingPiece
  def initialize(board, color, pos)
    super(board, color, pos)
  end
  
  def directions
    STRAIGHTS + DIAGONALS
  end
  
	def symbol
		["♔", "♚"]
	end
end