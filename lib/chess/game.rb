require "#{Dir.pwd}/lib/chess/pieces/piece.rb"
require "#{Dir.pwd}/lib/chess/pieces/sliding_piece.rb"
require "#{Dir.pwd}/lib/chess/pieces/pawn.rb"
require "#{Dir.pwd}/lib/chess/pieces/rook.rb"
require "#{Dir.pwd}/lib/chess/pieces/queen.rb"
require "#{Dir.pwd}/lib/chess/pieces/bishop.rb"
require "#{Dir.pwd}/lib/chess/pieces/king.rb"
require "#{Dir.pwd}/lib/chess/pieces/knight.rb"


Dir.glob('./pieces/*')  { |file| require file }
require 'active_support/inflector'

#how to load a whole folder?

class Game
  attr_accessor :player_white_id, :player_black_id, :turn
  attr_reader :board
  
  def initialize(params = {})
    # options = {
   #    player_white_id: 1,
   #    player_black_id: 2
   #  }.merge(params)

   puts params
   p params
    @player_white_id = params[:player_white_id]
    @player_black_id = params[:player_black_id]
    @turn = @player_white_id
    @board = Board.new(self)
  end
  
  def make_move(move)
    from = move[:from]
    to = move[:to]
    mover_id = move[:mover_id]
    puts "mover id"
    p mover_id
    puts "turn"
    p @turn
    puts "white player id"
    p @player_white_id
    puts "blac player id"
    p @player_black_id
    if !correct_turn?(mover_id)
      raise "not your turn"
    elsif !correct_piece?(from, mover_id)
      raise "not your piece"
    else
      board.take_turn(from, to)
      if board.game_over?(to)
        raise "check mate!"
      end
      next_turn   
    end
    #board.print
   
  end

  def next_turn
    @turn = @turn == @player_white_id ? @player_black_id : @player_white_id
  end
  
  def correct_piece?(from, mover_id)
    { white: @player_white_id, black: @player_black_id }.each do |color, id|
      return true if @board.piece_at(from).color == color && id == mover_id
    end
    
    false   
  end
  
  def correct_turn?(mover_id)    
    mover_id == @turn
  end
end

class Board
  attr_accessor :game, :board,
                :white_team, :white_king,
                :black_team, :black_king
  
  def initialize(game)
    
    @game = game
    @board = make_board
    @white_team = []
    @black_team = []
    @white_king
    @black_king
    install_pawns
    install_others
    #print
  end

  def move_piece(from, to, board = @board)
    mover = board[from[0]][from[1]]
    board[to[0]][to[1]] = mover
    board[from[0]][from[1]] = nil
    mover.pos = to
    
    mover
  end
  
  def take_turn(from, to)
    can_move = piece_at(from).valid_move?(to)
    if can_move
      putting_self_in_check = self.putting_self_in_check?(from, to)
    end
    
    if can_move && !putting_self_in_check
      puts "making a real move"
      move_piece(from, to)
    elsif can_move
      puts "mover -- #{piece_at(from).color} #{piece_at(from).class}"
      
      raise "you can't put yourself in check"
    else
      puts "from #{from}"
      puts "to #{to}"
      raise "that move is not included in #{piece_at(from).color} #{piece_at(from).class}'s moves"
    end
  end
  
  def piece_at(pos, board = @board)
      board[pos[0]][pos[1]]
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
    self.board.each_with_index do |row, i|
      row.each_with_index do |piece, j|
        dupped_board[i][j] = piece.nil? ? nil : piece.dup(dupped_board)
      end
    end

    dupped_board
	end
  
  def opposite_color(piece) 
    piece.color == :white ? :black : :white
  end
  
	def putting_self_in_check?(from, to)
    mover = self[from]
    offense = self.send("#{opposite_color(mover)}_team")
    defense_king = self.send("#{mover.color}_king")
		d_board = dup
		moved_piece = move_piece(from, to, d_board)
    
		in_check?(offense, defense_king, moved_piece, d_board)
	end
  
	def in_check?(offense, defense_king, moved_piece, board = @board)
		king_pos = defense_king.pos
		offense.each do |piece|
      piece = piece_at(piece.pos, board)
      piece = moved_piece unless piece

			piece.moves.each do |move|
				return true if move == king_pos
			end
		end

		false
	end
  
  def game_over?(last_moved_to_pos)
    mover = piece_at(last_moved_to_pos)
    offense = self.send("#{mover.color}_team")
    defense_king = self.send("#{opposite_color(mover)}_king")
    
    if in_check?(offense, defense_king, mover)
      puts "testing for check_mate"
      
      return true if check_mate?(defense_king)
    end
    
    false
  end
  
  def check_mate?(in_check_king)
    defense_team = self.send("#{in_check_king.color}_team")
    offense = self.send("#{opposite_color(in_check_king)}_team")
    
    defense_team.each do |piece|      
      piece.moves.each do |move|
        d_board = dup
    		moved_piece = move_piece(piece.pos, move, d_board) unless in_check_king == piece
        
        puts "in check?"
        puts in_check?(offense, in_check_king, moved_piece, d_board)
    		return false unless in_check?(offense, in_check_king, moved_piece, d_board)
      end
    end
    
    true
  end
  
  def print_team(team)
    team.each do |piece|
      puts "#{piece.color} #{piece.class}"
      puts piece.render
    end
  end
  
  def install_pawns
    [1, 6].each do |row|
      color = row == 1 ? :white : :black
      team = row == 1 ? :white_team : :black_team
      8.times do |col|
        self[row, col] = Pawn.new(@board, color, [row, col])
        self.send(team) << self[row, col]
      end
    end
  end
  
  def install_others
    [0, 7].each do |row|
      if row == 0
        color, team = :white, :white_team
      else
        color, team = :black, :black_team
      end
      
      [0,7].each { |col| self[row, col] = Rook.new(@board, color, [row, col]); self.send(team) << self[row, col]; }
      [1,6].each { |col| self[row, col] = Knight.new(@board, color, [row, col]); self.send(team) << self[row, col]; }
      [2,5].each { |col| self[row, col] = Bishop.new(@board, color, [row, col]); self.send(team) << self[row, col]; }
      
      self[row, 3] = King.new(@board, color, [row, 3])
      self.send(team) << self[row, 3]
      self.send("#{color}_king=", self[row, 3])
      
      self[row, 4] = Queen.new(@board, color, [row, 4])
      self.send(team) << self[row, 4]
    end
  end
  
  #debugging
  def print(board = @board)
    board.each do |row|
      line = ""
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
  
  PIECE_TRANSLATIONS = {
    Pawn: "P",
    Rook: "R",
    Bishop: "B",
    Queen: "Q",
    King: "K",
    Knight: "H"
  }
  
  def to_text
    board_as_text = ""
    @board.each do |row|
      row.each do |sq|
        if sq.nil? 
          board_as_text << "_,"
        else
          color = sq.color == :white ? "w" : "b" unless sq.nil?
          board_as_text << "#{color}#{PIECE_TRANSLATIONS["#{sq.class}".to_sym]},"
        end
      end
        board_as_text << "|"
    end
    
    board_as_text
  end
  
  def load_board(board_as_text)
    piece_loader = PIECE_TRANSLATIONS.invert

    #reset! danger!!!    
    self.board = make_board
    self.white_team = []
    self.black_team = []
    row_strings = board_as_text.split("|") 
    
    row_strings.each_with_index do |row_string, row|
      row_string.split(",").each_with_index do |str, col|
        if str == "_"
          self[row, col] = nil
        else
          color, type = str.split("")
          cls = piece_loader[type].to_s.constantize
          color = color == "w" ? :white : :black
          
          #load pieces!
          case type
          when "P"
            first_move = [[:white, 1], [:black, 6]].include?([color, row]) ? true : false
            self[row, col] = cls.new(@board, color, [row, col], first_move)
            self.send("#{color}_team") << self[row, col]
          when "K"
            self[row, col] = cls.new(@board, color, [row, col])
            self.send("#{color}_team") << self[row, col]
            self.send("#{color}_king=", self[row, col])
          else
            self[row, col] = cls.new(@board, color, [row, col])
            self.send("#{color}_team") << self[row, col]
          end
        end
      end
    end
      
    row_strings
  end
  
  def in_bounds?(pos)
    pos.all? { |x| (0...8).include?(x) }  
  end
  
  def [](pos1, pos2 = nil)
    x, y = pos2 ? [pos1, pos2] : pos1
   
    self.board[x][y]
  end
  
  def []=(pos1, pos2 = nil, value)
    x, y = pos2 ? [pos1, pos2] : pos1
    self.board[x][y] = value
  end
end

def t
  chess = Game.new
  chess.board.print
  puts chess.board[1,0].render
  
  chess.make_move([1,3],[3,3])
  
  chess.make_move([6,2],[4,2])

  chess.make_move([3,3],[4,2])
  
  puts "serializing and loading!"
  chess.board.load_board(chess.board.to_text)
  
  chess.make_move([6,1],[4,1])
  
  chess.make_move([0,4],[4,0])
end