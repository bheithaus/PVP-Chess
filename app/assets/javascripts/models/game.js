CH.Models.Game = Backbone.RelationalModel.extend({
	initialize: function(data) {
		this.player_white_id = data.player_white_id;
		this.player_black_id = data.player_black_id;
	},
	
	urlRoot: "/online_games",
	
	parse: function(data, options) {
		if (data.board) {
			var board = this.parse_board(data.board);
		}
		data.parsed_board = board;
		delete data["board"]
		return data;
	},
	
	toJSON: function() {
		return { move: {
					 from: this.from,
					   to: this.to,
				 mover_id: this.mover_id
			 			},
			online_game: {
				player_white_id: this.player_white_id,
				player_black_id: this.player_black_id
			}
		};
	},
	
	parse_board: function(board) {
		var parsed_board, board_str, board_strs;
		board_str = board;
			board_strs = board_str.split("|");
		parsed_board = [];
		
		_(board_strs).each(function(str){
			parsed_board.push([]);
			last = parsed_board.length - 1;
			parsed_board[last] = str.split(",").slice(0,8);
		});
		
		return parsed_board.slice(0,8)
	}
});