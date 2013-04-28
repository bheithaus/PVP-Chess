# encoding: utf-8

class Rook < SlidingPiece
  def initialize(board, color, pos)
    super(board, color, pos, 8)
  end
  
  def directions
    STRAIGHTS
  end
  
	def symbol
		["♖", "♜"]
	end
end