CH.Views.PlayGame = Backbone.View.extend({
	events: {
		"keypress": "handleChatInput"
	},
	
	initialize: function(options){
		// pusher subscribe
		this.gameChannel = CH.pusher.subscribe('private-game-' + this.model.id);
		
		//draw Chess Game
		this.setupCanvas(options);
		this.loadImages();
		
		// callbacks
		this.installRemoteUpdateCallbacks();
		
		this.mobileResponder();
	},
	
	setupCanvas: function(options) {
		this.canvas = options.$canvas.get(0);
		this.ctx = this.canvas.getContext("2d");
		this.clicks = 0;
		//invert display so user is always on bottom of board
		this.invert = (this.model.player_white_id == CH.Store.currentUser.id);
		this.canvas.onselectstart = function () { return false; }
	},
	
	mobileResponder: function() {
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
	
	installRemoteUpdateCallbacks: function() {
		var remoteUpdateCallback = this.remoteUpdate.bind(this);
		var remoteUpdateErrorCallback = this.remoteUpdateError.bind(this);
		var redrawCallback = this.redrawBoard.bind(this);
		
		// bind listeners
		this.listenTo(this.model, 'change', redrawCallback);
		this.gameChannel.bind('remote_update', remoteUpdateCallback);
		this.gameChannel.bind('remote_update_error', remoteUpdateErrorCallback);
		this.listenTo(this.model, 'updated_remotely', redrawCallback);  //replace with animateCallback :)	
	},
	
	installChatCallbacks: function() {
		console.log("installing chat callbacks and input handler");
		var channel = this.gameChannel,
	     discussion = this.$("#discussion");
		
		this.gameChannel.bind('client-chat', function(chat) {
			discussion.append('<li>' + chat.text + '</li>');
		});
	},
	
	handleChatInput: function(event) {
		var	   channel = this.gameChannel;
		    discussion = this.$("#discussion"),
				 input = this.$("#chat-input");
			console.log(event.keyCode);
			if (event.keyCode == 13) {
				var chat = input.val();
				var triggered = channel.trigger('client-chat', { text: chat });
				setTimeout(function() {
					if (triggered) {
						discussion.append('<li>' + chat + '</li>');
					}
				}, 300);
				input.val("");
			}
	
		
	},
	
	myTurn: function() {
		return (this.model.get("turn") == CH.Store.currentUser.id);
	},
	
	brownRad: function() {
		var mid = this.canvas.height / 2;
		var radgrad = this.ctx.createRadialGradient(mid,mid,2*mid,mid,mid, 50 );
	    radgrad.addColorStop(0, '#7D7865');
	    radgrad.addColorStop(0.3, '#7D7865');
	    radgrad.addColorStop(1, 'rgba(90,90,90,.7)');
		
		return radgrad;
	},
	
	whiteRad: function() {
		var mid = this.canvas.height / 2;
		var radgrad = this.ctx.createRadialGradient(mid,mid,2*mid,mid,mid, 50 );
	    radgrad.addColorStop(0, '#F7F7F7');
	    radgrad.addColorStop(0.3, '#F7F7F7');
	    radgrad.addColorStop(1, 'rgba(240,240,240,.7)');
		
		return radgrad;
		
	},

	
	errorAlert: function (error) {
	    var alertDiv = this.$("#game-alert");
		
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
		if (this.myTurn()) {
		    var alertDiv = this.$("#game-alert");
			 	
			alertDiv.text("You are in Check!");
			alertDiv.addClass("in");
			alertDiv.addClass("alert-error");
		}
	},
	
	clearCheckAlert: function () {
	    var alertDiv = this.$("#game-alert");
		 	
		alertDiv.text();
		alertDiv.removeClass("in");
		alertDiv.removeClass("alert-error");
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
		// ohhhhh!
		if (this.myTurn()) {
			this.errorAlert(error);
			console.log(error);
		}
	},
	
	remoteUpdate: function(data) {
		console.log('remote_update success');
		console.log(data);
		this.model.set(this.model.parse(data));
		if (this.model.get("in_check")) {
			this.inCheckAlert();
		} else {
			this.clearCheckAlert();
		}
		
		console.log("is it my turn");
		console.log(CH.Store.currentUser.id);
		console.log(this.model.get("turn"));
		this.toggleCanvasClickListener();
		
		this.model.trigger('updated_remotely');
	},
	
	redrawBoard: function() {
		this.drawBlankBoard();
		this.loadImages();
	},
	
	toggleWaiting: function() {
		var  waiting = !this.myTurn(),
	    	alertDiv = this.$("#game-alert");
		
		if (waiting) {
			console.log("awaiting opp move");
			alertDiv.text("Awaiting Opponent's Move");
			alertDiv.addClass("in");
		} else {
			alertDiv.text();
			alertDiv.removeClass("in");
		}
	},
	
	toggleCanvasClickListener: function() {
		var clickable = this.myTurn();
		console.log(clickable);
		if (!this.clickCallback) {
			this.clickCallback = this.click.bind(this);
		}
		
		if (clickable) {
			console.log("turn on canvas clickable");
			this.canvas.addEventListener('click', this.clickCallback, false);
		} else {
			console.log("turn off canvas clickable");
			this.canvas.removeEventListener('click', this.clickCallback);
		}
		this.toggleWaiting();
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
		
	    var  that = this,
		 sqLength = this.sideLength/8,
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
					that.toggleCanvasClickListener();
					
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
	
	setMessages: function() {
		if (this.model.get("in_check")) {
			this.inCheckAlert();
		}
	},
	
	render: function() {
		var ctx = this.ctx,
			length = this.sideLength;
			
		var statsView = new CH.Views.GameStats({
								model: this.model
							});
		
		var chatView = new CH.Views.Chat.InGame();
		
		this.$el.append(statsView.render().$el);				

		
		// this.$el.html(statsView.render().$el);
		this.$el.append(this.canvas);
		this.$el.append(chatView.render().$el);
		
		this.redrawBoard();
		this.installChatCallbacks();
		this.toggleCanvasClickListener();
		this.setMessages();
		
		
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

 		ctx.fillStyle = "#FFFFFF";
        ctx.clearRect(0, 0, length, length);
	    ctx.fillStyle = this.brownRad();//"rgb(74,74,74)";
	    ctx.fillRect(0, 0, length, length);
	    ctx.fillStyle = this.whiteRad();//"rgb(235,235,235)";
		_(8).times(function(i) {
			_(4).times(function(j) {
				offset = i % 2 == 0 ? 0 : length/8;
			    ctx.fillRect(j*length/4 + offset, i*length/8, length/8, length/8);
			});
		});
	},
	
	loadImages: function() {
		if (!CH.Store.imgs) {
			var piece,
				that = this;
			CH.Store.loadedImgsCount = 0;
			CH.Store.imgs = {};
			_(["b", "w"]).each(function(color) {
				_(["R","P","K","B","Q","H"]).each(function(type){
					piece = color + type
					CH.Store.imgs[piece] = new Image();
					CH.Store.imgs[piece].src =  '/assets/' + piece + '.png';
					CH.Store.imgs[piece].onload = function() {
						CH.Store.loadedImgsCount++;
						if (CH.Store.loadedImgsCount == 12) {
							that.drawPieces();
						} else {
							console.log(CH.Store.loadedImgsCount)
						}
					}
				});
			});
		} else {
			this.drawPieces();
		}
		
		return CH.Store.imgs;
	},
	
	drawPieces: function () {
		// I would like to draw the board so that the user is always at the bottom....
		var o, m;
		
		if (this.invert) {
			o = this.sideLength - 58;
			m = 1;
		} else {
			o = 0;
			m = -1;
		}
		
		var  imgs = CH.Store.imgs,
			 board = this.model.get("parsed_board"),
			 ctx = this.ctx,
			 sq_pos = this.sideLength/8,
 				d = this.sideLength/70;
			 
		_(board).each(function(row, i) {
			_(row).each(function(sq, j) {
				if (sq != "_") {
					ctx.drawImage(imgs[sq], o - m * (j * sq_pos + d), o - m *(i * sq_pos + d));
				}
			});
		});
	}
});