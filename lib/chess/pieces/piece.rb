class Piece
  attr_accessor :board, :color, :pos
  
  def initialize(board, color, pos)
    @board, @color, @pos = board, color, pos
  end

  def moves
    #overwrite!
  end
  
	def render
		color = @color == :white ? 0 : 1
		symbol[color]
	end
  
  def dup(dupped_board)
    self.class.new(dupped_board, @color, @pos)
  end
end
