require_relative 'pieces/piece'
require_relative 'pieces/sliding_piece'
require_relative 'pieces/pawn'
require_relative 'pieces/bishop'
require_relative 'pieces/queen'
require_relative 'pieces/king'
require_relative 'pieces/rook'
require_relative 'pieces/knight'
require 'debugger'

#how to load a whole folder?

class Game
  attr_reader :board
  
  def initialize
    @board = Board.new(self)
  end

end


class Board
  attr_accessor :game, :board,
                :white_team, :white_king,
                :black_team, :black_king
  
  def initialize(game, options = {})
    # @player_white_id = options.try(player_white_id)
#     @player_black_id = options.try(player_black_id) 
    
    @game = game
    @board = make_board
    @white_team = []
    @black_team = []
    @white_king
    @black_king
    install_pawns
    install_others
    print
  end

  def move_piece(from, to, board = @board)
    board[to[0]][to[1]] = board[from[0]][from[1]]
    board[from[0]][from[1]] = nil
  end
  
  def take_turn(from, to)
    can_move = piece_at(from).valid_move?(to)
    if can_move
      not_in_check = self.valid_move?(from, to)
    end
    
    if can_move && not_in_check
      move_piece(from, to)
    elsif can_move
      raise "you can't put yourself in check"
    else
      puts "from #{from}"
      puts "to #{to}"
      raise "that move is not included in #{piece_at(from).color} #{piece_at(from).class}'s moves"
    end
  end
  
  def piece_at(pos)
    self[pos]
  end
  
  def make_board
    b = []
    8.times do |i|
      b << []
      8.times { b[i] << nil }
    end
    
    b
  end
  
	def dup
		dupped_board = make_board
    @board.each_with_index do |row, i|
      row.each_with_index do |piece, j|
        dupped_board[i][j] = piece.nil? ? nil : piece.dup(dupped_board)
      end
    end
        
    dupped_board
	end
  
	def valid_move?(from, to)
    mover = self[*from]
    offense = self.send("#{mover.color}_team")
    opposite_color = mover.color == :white ? :black : :white
    defense_king = self.send("#{opposite_color}_king")
		d_board = dup
		move_piece(from, to, d_board)
    
		!in_check?(offense, defense_king, d_board)
	end
  
	def in_check?(offense, defense_king, board = @board)

		king_pos = defense_king.pos
    p offense
		offense.each do |piece|
      puts piece.class
      puts piece.moves
			piece.moves.each do |move|
				return true if move == king_pos
			end
		end

		false
	end

  def install_pawns
    [1, 6].each do |row|
      color = row == 1 ? :white : :black
      team = row == 1 ? :white_team : :black_team
      p color
      8.times do |col|
        self[row, col] = Pawn.new(self, color, [row, col])
        self.send(team) << self[row, col]
      end
    end
  end
  
  def print_team(team)
    team.each do |piece|
      puts "#{piece.color} #{piece.class}"
      puts piece.render
    end
  end
  
  def install_others
    [0, 7].each do |row|
      if row == 0
        color, team, king = :white, :white_team, :white_king
      else
        color, team, king = :black, :black_team, :black_king
      end
      
      [0,7].each { |col| self[row, col] = Rook.new(self, color, [row, col]); self.send(team) << self[row, col]; }
      [1,6].each { |col| self[row, col] = Knight.new(self, color, [row, col]); self.send(team) << self[row, col]; }
      [2,5].each { |col| self[row, col] = Bishop.new(self, color, [row, col]); self.send(team) << self[row, col]; }
      
      queen_pos = row == 0 ? 3 : 4
      king_pos = row == 0 ? 4 : 3
      self[row, king_pos] = King.new(self, color, [row, king_pos])
      self.send(team) << self[row, king_pos]
      self.send("#{king}=", self[row, king_pos])
      self[row, queen_pos] = Queen.new(self, color, [row, queen_pos])
      self.send(team) << self[row, queen_pos]
    end
  end
  
  #debugging
  def print(board = @board)
    board.each do |row|
      line =""
      row.each do |sq|
        unless sq.nil?
          line << " #{sq.render} "
        else
          line << " _ "
        end
      end
      puts line
    end
    
    nil
  end
  
  def in_bounds?(pos)
    pos.all? { |x| (0...8).include?(x) }  
  end
  
  def [](pos1, pos2=false)
    x, y = pos2 ? [pos1, pos2] : pos1
   
    self.board[x][y]
  end
  
  def []=(pos1, pos2 = false, value)
    x, y = pos2 ? [pos1, pos2] : pos1
    self.board[x][y] = value
  end
end


def t
  chess = Game.new
  chess.board.print
  puts chess.board[1,0].render
  p chess.board[2,0]
  chess.board.take_turn([1,0],[2,0])
  chess.board.print
  
  
  
end