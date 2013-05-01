CH.Views.PlayGame = Backbone.View.extend({

	initialize: function(options){
		this.$el = options.$el;
		this.canvas = this.$el.get(0);
		this.ctx = this.canvas.getContext("2d");
		this.sideLength = this.canvas.height;
		this.clicks = 0;
		this.invert = (this.model.player_white_id == CH.Store.currentUser.id)
		//modify click and drawPieces to implement invert
		
		// pusher subscribe
		this.gameChannel = CH.pusher.subscribe('private-game-' + this.model.id);
				
		// callbacks
		var remoteUpdateCallback = this.remoteUpdate.bind(this);
		var clickCallback = this.click.bind(this);
		var renderCallback = this.render.bind(this);
		
		// bind listeners 
		this.gameChannel.bind('remote_update', remoteUpdateCallback);
		this.listenTo(this.model, 'remote_update', renderCallback);
		this.canvas.addEventListener('click', clickCallback, false);
	},
	
	remoteUpdate: function(data) {
		console.log('remote_update triggered');
		console.log(data);
		this.model.set(this.model.parse(data));
		this.model.trigger('remote_update');
	},
	
	click: function(e) {
		//o and m are the inverters
		var o, m;
		
		if (this.invert) {
			o = 7;
			m = 1;
		} else {
			o = 0;
			m = -1;
		}
		
	    var sqLength = this.sideLength/8,
			mouse = this.getCursorPosition(this.canvas, e),
			x = o - m * Math.floor(mouse.X / sqLength),
			y = o - m * Math.floor(mouse.Y / sqLength);
			
		if (this.clicks === 0) {
			this.model.from = [y, x];
		} else {
			this.model.to = [y, x];
			this.model.mover_id = CH.Store.currentUser.id;
			this.model.save({
				success:function(model){ 
					console.log(model);
				}
			});
			console.log("from");
			console.log(this.model.from);
			console.log("to");
			
			console.log(this.model.to);
		}
		 
 		this.clicks = this.clicks == 1 ? 0 : 1;
		 
	    console.log("Mouse X: " + mouse.X + " mouse Y: " + mouse.Y);
	},
	
	getCursorPosition: function(canvas, event) {
		var x, y;

		cOffset = $(canvas).offset();
		x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(cOffset.left);
		y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(cOffset.top) + 1;

		return { X : x, Y : y };
	},
	
	render: function() {
		var ctx = this.ctx,
			length = this.sideLength,
			renderedContent = JST["games/play"]({
									game: this.model
								});
								
		this.$el.html(renderedContent);

        ctx.clearRect(0, 0, length, length);
		this.drawBlankBoard();
		this.drawPieces();
		return this;
	},
	
	animate: function(from, to) {
		var o, m, fromColor, toColor, 
			board = this.model.get("parsed_board"),
		   length = this.sideLength;
		
		if (this.invert) {
			o = this.sideLength - 58;
			m = 1;
		} else {
			o = 0;
			m = -1;
		}
		//[y, x]
		//[i, j]
		fromColor = this.squareColor(from)
		toColor = this.squareColor(to)
		
		
		// calculate color of squares
		
		// repeatedly draw semi transparent square over the to square
		// using...
		// ctx.globalAlpha=0.2;
		// move from piece in a straight line to to
	},
	
	squareColor: function(sq) {
		var o, m,
			length = this.sideLength;
		if (this.invert) {
			o = this.sideLength - 58;
			m = 1;
		} else {
			o = 0;
			m = -1;
		}
		
		
		
		
		
	},
	
	drawBlankBoard: function() {
		var ctx = this.ctx,
		 length = this.sideLength;
		
	    ctx.fillStyle = "rgb(74,74,74)";
	    ctx.fillRect(0, 0, length, length);
	    ctx.fillStyle = "rgb(235,235,235)";
		_(8).times(function(i) {
			_(4).times(function(j) {
				offset = i % 2 == 0 ? 0 : length/8;
			    ctx.fillRect(j*length/4 + offset, i*length/8, length/8, length/8);
			});
		});
	},
	
	drawPieces: function () {
		// I would like to draw the board so that the user is always at the bottom....
		var o, m;
		
		console.log(this.sideLength);
		console.log(this.inverse);
		
		if (this.invert) {
			o = this.sideLength - 58;
			m = 1;
		} else {
			o = 0;
			m = -1;
		}
		
		var  imgs = {},
			 board = this.model.get("parsed_board"),
			 ctx = this.ctx,
			 sq_pos = this.sideLength/8,
 				d = this.sideLength/70;
			 
		_(board).each(function(row, i) {
			_(row).each(function(sq, j) {
				if (sq != "_") {
					imgs[sq] = new Image();
					imgs[sq].onload = function () {
						console.log("x")
						console.log(o)
						console.log(m)
						console.log(sq);
						console.log(o - m * (j * sq_pos + d));
						console.log("y")
						console.log(o - m * (j * sq_pos + d));
						
						
						
						ctx.drawImage(imgs[sq], o - m * (j * sq_pos + d), o - m *(i * sq_pos + d));
					}
					imgs[sq].src = '/assets/' + sq + '.png';
				}
			});
		});
	}
});