CH.Views.PlayGame = Backbone.View.extend({

	initialize: function(options){
		this.canvas = options.$canvas.get(0);
		this.ctx = this.canvas.getContext("2d");
		this.clicks = 0;
		this.invert = (this.model.player_white_id == CH.Store.currentUser.id);
		//modify click and drawPieces to implement invert
		
		// pusher subscribe
		this.gameChannel = CH.pusher.subscribe('private-game-' + this.model.id);
				
		// callbacks
		var remoteUpdateCallback = this.remoteUpdate.bind(this);
		var remoteUpdateErrorCallback = this.remoteUpdateError.bind(this);
		
		var clickCallback = this.click.bind(this);
		var redrawCallback = this.redrawBoard.bind(this);
		
		// bind listeners 
		this.gameChannel.bind('remote_update', remoteUpdateCallback);
		this.gameChannel.bind('remote_update_error', remoteUpdateErrorCallback);
		
		this.listenTo(this.model, 'remote_update', redrawCallback);  //replace with animateCallback :)
		this.canvas.addEventListener('click', clickCallback, false);
		
		
		// mobile resize and orientation handlers
		this.rc = 0;  // resize counter
		this.oc = 0;  // orientiation counter
		var ios = navigator.userAgent.match(/(iPhone)|(iPod)/);

		var resizeTimeout;
		var that = this;
		$(window).resize(function() {
		  clearTimeout(resizeTimeout);
		  resizeTimeout = setTimeout(that.resizeCanvas.bind(that), 100);
		});
		this.resizeCanvas();

		var otimeout;
		window.onorientationchange = function() {
		  clearTimeout(otimeout);
		  otimeout = setTimeout(that.orientationChange.bind(that), 50);
		}
		if (ios) {
		  // increase height to get rid off ios address bar
		  $("#container").height($(window).height() + 60)
		}
		
		var width = window.screen.availWidth;
		var height = window.screen.availHeight;		
		
		var cheight = height - 50 > 600 ? 600 : height - 50 ; //max size 600px Square
		var cwidth = width - 50;
		
		if (cheight < cwidth) {
			cwidth = cheight;
		} else {
			cheight = cwidth;
		}
		// 
		// console.log("c height");
		// console.log(cheight);
		// console.log("c width");
		// 
		// console.log(cwidth);

		// set canvas width and height
		$(this.canvas).attr('width', cwidth);
		$(this.canvas).attr('height', cheight)
		this.sideLength = this.canvas.height;

		// hides the WebKit url bar
		if (ios) {
		  setTimeout(function() {
			  window.scrollTo(0, 1);
		  }, 100);   
		}
	},
	
	errorAlert: function (error) {
	    var alertDiv = $("#game-alert");
		
		alertDiv.text(error);
		alertDiv.addClass("in");		
		
		var that = this;
		window.setTimeout(function () {
			alertDiv.removeClass("in");
			if (that.model.get("in_check")) {
				that.inCheckAlert();
			}
		}, 3000);
		this.redrawBoard();
	},
	
	inCheckAlert: function() {
		if (this.model.get("turn") == CH.Store.currentUser.id) {
		    var alertDiv = $("#game-alert");
			 	
			alertDiv.text("You are in Check!");
			alertDiv.addClass("in");
			alertDiv.addClass("alert-error");
		}
	},
	
	orientationChange: function () {
	  // inc orientation counter
	  this.oc++;
	},
	
	resizeCanvas: function() {
	  // inc resize counter
	  this.rc++;
	},
	
	remoteUpdateError: function(error) {
		this.errorAlert(error);
		console.log(error);
	},
	
	remoteUpdate: function(data) {
		console.log('remote_update triggered');
		console.log(data);
		this.model.set(this.model.parse(data));
		if (this.model.get("in_check")) {
			this.inCheckAlert();
		}
		this.model.trigger('remote_update');
	},
	
	redrawBoard: function() {
        this.ctx.clearRect(0, 0, length, length);
		this.drawBlankBoard();
		this.drawPieces();
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
			this.highlightSquare([y, x]);
		} else {
			this.model.to = [y, x];
			this.model.mover_id = CH.Store.currentUser.id;
			this.model.save({
				success:function(model) { 
					console.log(model);
				},
				
				error: function(model) {
					
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
			length = this.sideLength;

			
		var statsView = new CH.Views.GameStats({
								model: this.model
							});
					
		this.$el.append(statsView.render().$el);				

		if (this.model.get("in_check")) {
			var that = this;
			window.setTimeout(function(){
				
				that.inCheckAlert();
			}, 300);
		}
								
		// this.$el.html(statsView.render().$el);
		this.$el.append(this.canvas);

		this.redrawBoard();
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
	
	highlightSquare: function(sq) {
		var o, m,
			i = sq[0],
			j = sq[1],
			ctx = this.ctx,
			length = this.sideLength;
			
		if (this.invert) {
			o = this.sideLength * 7 / 8;
			m = 1;
		} else {
			o = 0;
			m = -1;
		}

		ctx.globalAlpha = 0.2;
		
	    ctx.fillStyle = "rgb(49,92,235)";
		
	    ctx.fillRect(o - m * (j*length/8), o - m * (i*length/8), length/8, length/8);
		ctx.globalAlpha = 1;
	},
	
	unHighlightSquare: function(sq) {
		var o, m,
			i = sq[0],
			j = sq[1],
			ctx = this.ctx,
			board = this.model.get("parsed_board");
			length = this.sideLength;
			
		if (this.invert) {
			o = this.sideLength - 58;
			m = 1;
		} else {
			o = 0;
			m = -1;
		}
		ctx.globalAlpha = 0.2;
		
	    ctx.fillStyle = "rgb(49,92,235)";
		
	    ctx.fillRect(j*length/8, i*length/8, length/8, length/8);
		ctx.globalAlpha = 1;
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
						// console.log("x")
// 						console.log(o)
// 						console.log(m)
// 						console.log(sq);
// 						console.log(o - m * (j * sq_pos + d));
// 						console.log("y")
// 						console.log(o - m * (j * sq_pos + d));
// 						
						
						
						ctx.drawImage(imgs[sq], o - m * (j * sq_pos + d), o - m *(i * sq_pos + d));
					}
					imgs[sq].src = '/assets/' + sq + '.png';
				}
			});
		});
	}
});