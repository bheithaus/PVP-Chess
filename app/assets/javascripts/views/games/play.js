CH.Views.PlayGame = Backbone.View.extend({

	initialize: function(options){
		this.$el = options.$el;
		this.canvas = this.$el.get(0);
		this.ctx = this.canvas.getContext("2d");
		this.sideLength = this.canvas.height;
		this.clicks = 0;
		
		var that = this;
		var clickCallback = that.click.bind(that);
		var renderCallback = that.render.bind(that);
		
		that.listenTo(that.model, 'sync', renderCallback);
		that.canvas.addEventListener('click', clickCallback, false);
	},
	
	click: function(e) {
	    var mouseX, mouseY, sqLength;
		sqLength = this.sideLength/8;

		if (e.offsetX) {
			mouseX = e.offsetX;
			mouseY = e.offsetY;
		} else if (e.layerX) {
			mouseX = e.layerX;
			mouseY = e.layerY;
		}
		
		var x = Math.floor(mouseX / sqLength),
			y = Math.floor(mouseY / sqLength);
			
		if (this.clicks === 0) {
			this.model.from = [y, x];
		} else {
			this.model.to = [y, x];
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
		 
	    console.log("Mouse x "+ mouseX+ " mouse Y: " +mouseY);
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
	
	selectSquare: function(event) {
		console.log(event.target)
		
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
		var  imgs = {},
			 board = this.model.get("parsed_board"),
			 ctx = this.ctx,
			 sq_pos = this.sideLength/8,
			 d = this.sideLength/35;
			 
		_(board).each(function(row, i) {
			_(row).each(function(sq, j) {
				if (sq != "_") {
					imgs[sq] = new Image();
					imgs[sq].onload = function () {
						ctx.drawImage(imgs[sq], j * sq_pos + d, i * sq_pos + d);
					}
					imgs[sq].src = '/assets/' + sq + '.png';
				}
			});
		});
	}
});