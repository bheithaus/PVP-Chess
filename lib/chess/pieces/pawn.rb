# encoding: utf-8

class Pawn < Piece
  attr_reader :forward
  
  def initialize(board, color, pos, first_move = true)
    super(board, color, pos)
    @forward = self.color == :white ? 1 : -1
    @first_move = first_move
  end

  def moves
    p forward_moves
    forward_moves + diag_moves
  end
  
  def forward_moves
    forward_deltas.map { |delta| add_delta(self.pos, delta) }
  end
  
  def forward_deltas
    forward_deltas = [ [forward, 0] ]
    return [] if blocked?(add_delta(self.pos, forward_deltas[0]))
    
    if ( @first_move )
      @first_move = false
      forward_deltas << [2*forward, 0]
    end
    
    
    puts "forward_deltas"
    p forward_deltas
    forward_deltas
  end
  
  def blocked?(pos)
    return false unless self.board[pos]
    
    pos[1] == self.pos[1] || self.board[pos].color == self.color 
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
    board.in_bounds?(corner) && board[corner] != nil && board[corner].color != self.color
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