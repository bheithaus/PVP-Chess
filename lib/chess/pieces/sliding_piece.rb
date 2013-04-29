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
    moves = []
    here = self.pos
    puts "I am a #{self.color} #{self.class}"
    puts "#{range} is my range"
    directions.each do |direction|
      distance = 1
      new_move = grow direction, distance
      puts direction
      puts distance
      while self.board.in_bounds?(new_move) && distance <= range do
        if free_path_to?(new_move)
          moves << new_move
        elsif take_opponent?(new_move)
          moves << new_move
          break
        else
          break
        end
        distance += 1
      end
    end

    moves
  end
  
  def grow(direction, i)    
    direction[0] = direction[0] * i
    direction[1] = direction[1] * i 
    
    direction
  end  
  
  def free_path_to?(pos)
    self.board[pos] == nil
  end
  
  def take_opponent?(pos)
    self.board[pos].color != self.color
  end
end