# encoding: utf-8

class Knight < Piece

  def possible_deltas
    [
     [1,2],
     [2,1],
     [-1,2],
     [1,-2],
     [-2,1],
     [-2,-1],
     [-1,-2],
     [2,-1]
    ]
  end

  def moves
    moves = []
    possible_deltas.each do |delta|
      move = add_delta(self.pos, delta)
      
      if in_bounds?(move) && enemy_or_empty?(move)
        moves << move
      end
    end
    
    moves
  end
  
  def enemy_or_empty?(pos)
    piece_at(pos) == nil || piece_at(pos).color != self.color
  end

  def symbol
  	["♘", "♞"]
  end

end