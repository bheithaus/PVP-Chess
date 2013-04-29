class Piece
  attr_accessor :board, :color, :pos
  
  def initialize(board, color, pos)
    @board, @color, @pos = board, color, pos
  end

  def moves
    raise "moves in Piece not implemented "
  end
  
  def valid_move?(to)
    my_moves = self.moves
    my_moves.include?(to)
  end
  
	def render
		color = @color == :white ? 0 : 1
		symbol[color]
	end
  
  def in_bounds?(pos)
    pos.all? { |x| (0...8).include?(x) }  
  end
  
  def dup(dupped_board)
    self.class.new(dupped_board, @color, @pos)
  end
  
  #convience
  def piece_at(pos)
    x, y = pos
   
    self.board[x][y]
  end
  
  def piece_at=(pos, value)
    x, y = pos
    
    self.board[x][y] = value
  end
  
  def add_delta(position, delta)
    pos = position.dup
    pos[0] += delta[0]
    pos[1] += delta[1]
    
    pos
  end
end