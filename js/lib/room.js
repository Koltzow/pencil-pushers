define(function () {

	var Room = {
		seed: '',
		width: 0,
		height: 0,
		tileheight: 16,
		tilewidth:16,
		room: [],
		currentTileset: null,
		currentImage: new Image(),
		tilesets: [
			{
				columns: 1,
				image: 'images/tilesheets/rooms/demo.png',
				imageheight: 16*3,
				imagewidth: 16,
				margin: 0,
				name: 'demo',
				spacing: 0,
				tilecount: 3,
				tileheight: 16,
				tilewidth: 16
			}
		]
	};
		
	Room.generate = function () {
	
		this.seed = EXP.util.seed.create();
	
		this.room = [];
		this.currentTileset = this.tilesets[Math.floor(Math.random()*this.tilesets.length)];
		this.currentImage.src = this.currentTileset.image;
		
		this.width = Math.ceil(EXP.engine.width/16)+2;
		this.height = Math.ceil(EXP.engine.height/16)+4;
		
		for (var y = 0; y < this.height; y++) {
			for (var x = 0; x < this.width; x++) {
			
				if(y === 0 || y === this.height-1 || x === 0 || x === this.width-1){
					this.room.push([0,2]); //roof
					continue;
				}
				
				if( y > 0 && y < 4 && x > 0 && x < this.width ){
					this.room.push([0,1]);
					continue;
				}
				
				this.room.push([0,0]);
				continue;
				
			}
		}
				
		EXP.bosses.test.create();
		
		new EXP.objects.health({x:5*EXP.engine.TILESIZE,y:EXP.engine.TILESIZE*2});
		new EXP.weapons.stapler(undefined, {x: 2*EXP.engine.TILESIZE, y: 4*EXP.engine.TILESIZE});
		
		EXP.camera.follow(EXP.controller.controllers);
		
		return true;
	};
	
	Room.update = function () {};
	
	Room.render = function () {
	
		EXP.engine.ctx.fillStyle = '#222';
		EXP.engine.ctx.fillRect(0, 0, EXP.engine.width, EXP.engine.height);
				
		for (var i = 0; i < this.room.length; i++) {
								
			EXP.engine.ctx.drawImage(
				this.currentImage,
				this.room[i][0] * this.tilewidth, 
				this.room[i][1] * this.tileheight, 
				this.tilewidth, 
				this.tileheight, 
				(i - Math.floor(i/this.width)*this.width) * this.tilewidth - EXP.camera.x - this.tilewidth, 
				Math.floor(i/this.width) * this.tileheight - EXP.camera.y - this.tilewidth*3, 
				this.tilewidth, 
				this.tileheight
			);
			
		}
	
	};

	return Room;

});