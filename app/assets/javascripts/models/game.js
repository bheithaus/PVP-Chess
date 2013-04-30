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
		return { move: {from: this.from, to: this.to},
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
			// _(str.split(",")).each(function(piece) {
				
				// switch (piece) {
	// 				case "_":
	// 					parsed_board[last].push(null);
	// 					break;
	// 				default:
	// 					parsed_board[last].push(piece);
												// 
						// switch (type) {
						// 	case "P":
						// 		//pawn
						// 		break;
						// 	case "R":
						// 		//rook
						// 	
						// 		break;
						// 	case "B":
						// 		//bishop
						// 		
						// 		break;
						// 	case "H":
						// 		//knight
						// 		
						// 		break;
						// 	case "Q":
						// 		//queen
						// 		
						// 		break;
						// 	case "K":
						// 		//king
						// 		
						// 		break;							
						// 	
						// }
				// }
				
			// });
		});		
		
		return parsed_board.slice(0,8)
	}
});