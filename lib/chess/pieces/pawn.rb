# encoding: utf-8

class Pawn < Piece
  attr_reader :forward
  
  @@n = 0
  
  def initialize(board, color, pos, first_move = true)
    super(board, color, pos)
    @forward = self.color == :white ? 1 : -1
    @first_move = first_move
    @@n += 1
    @name = "#{@color} Pawn ##{@@n}"
  end

  def moves
    forward_moves + diag_moves
  end
  
  def pos=(new_pos)
    @first_move = false
    @pos = new_pos
  end
  
  def forward_moves
    forward_deltas.map { |delta| add_delta(self.pos, delta) }
  end
  
  def forward_deltas
    forward_deltas = [ [forward, 0] ]
    return [] if blocked?(add_delta(self.pos, forward_deltas[0]))
    
    if ( @first_move && !blocked?(add_delta(self.pos, [2*forward, 0])))
      forward_deltas << [2*forward, 0]
    end
    
    forward_deltas
  end
  
  def blocked?(pos)
    Board.
    return false unless self.piece_at(pos)
    
    true
  end
  
  def diag_moves
    diag_moves = []
    corners = [1, -1].map { |dir| add_delta(self.pos, [forward, dir]) }
    corners.each do |corner|
      if enemy_in_attack_zone?(corner)
        diag_moves << corner
      end
    end
    
    diag_moves
  end
  
  def enemy_in_attack_zone?(corner)
    in_bounds?(corner) && piece_at(corner) != nil && piece_at(corner).color != self.color
  end
  
  def dup(dupped_board)
    self.class.new(dupped_board, @color, @pos, @first_move)
  end
  
	def symbol
		["♙", "♟"]
	end
end