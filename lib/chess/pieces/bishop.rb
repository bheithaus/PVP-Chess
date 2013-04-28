# encoding: utf-8

class Bishop < SlidingPiece
  def initialize(board, color, pos)
    super(board, color, pos, 8)
  end
  
  def directions
    DIAGONALS
  end
  
	def symbol
		["♗", "♝"]
	end
end