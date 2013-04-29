# encoding: utf-8

class Knight < Piece

  def possible_moves
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
    possible_moves.each do |move|
      if self.board.in_bounds?(move) && enemy_or_empty?(move)
        moves << move
      end
    end
    
    moves
  end
  
  def enemy_or_empty?(pos)
    self.board[pos] == nil || self.board[pos].color != self.color
  end

  def symbol
  	["♘", "♞"]
  end

end