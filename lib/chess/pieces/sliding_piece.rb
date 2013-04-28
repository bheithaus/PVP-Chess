STRAIGHTS =   [ [0, -1],
                [0,  1],
                [1,  0],
                [-1, 0]
              ]
DIAGONALS =   [ [1, -1],
                [1,  1],
                [-1, 1],
                [-1,-1]
              ]

class SlidingPiece < Piece
  attr_accessor :range
  
  def initialize(board, color, pos, range = 1)
    super(board, color, pos)
    @range = range
  end
  
  def directions
    #overwrite me
    raise "NotYetImplementedError"
  end
  
  def moves
    here = self.pos
    directions.each do |direction|
      i = 1
      new_move = grow direction, i 
      while @game.in_bounds?(new_move) && i <= range do
        if free_path_to?(new_move)
          moves += new_move
        elsif take_opponent?(new_move)
          moves += new_move
          break
        end
        i += 1
      end
    end

    moves
  end
  
  def grow(direction)
    direction[1] = direction[1] * i
    direction[2] = direction[2] * i 
    
    direction
  end  
  
  def free_path_to?(pos)
    self.game[pos] == null
  end
  
  def take_opponent?(pos)
    self.game[pos].color != self.color
  end
end