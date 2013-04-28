# encoding: utf-8

class Queen < SlidingPiece
  def initialize(board, color, pos)
    super(board, color, pos, 8)
  end
  
  def directions
    STRAIGHTS + DIAGONALS
  end
  
	def symbol
		["♕", "♛"]
	end
end