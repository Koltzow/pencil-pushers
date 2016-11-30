/*jshint bitwise: false*/

var EXP = EXP || {};

define(function () {

	var Room = {
		seed: '',
		color: '#333',
		tilesheet: new Image()
	};
	
	Room.tilesheet.src = 'images/tilesheets/planet/vegetation3.png';
	
	Room.generate = function () {
		
		this.seed = EXP.util.seed.create();
		
		EXP.boss.test.create();
		
		EXP.objects.health.create({x:500,y:250});
		EXP.objects.trap.create({x:128,y:234});
		
		EXP.camera.follow(EXP.controller.controllers);
		
		return true;
	};
	
	Room.render = function () {
	
		EXP.engine.ctx.fillStyle = this.color;
		EXP.engine.ctx.fillRect(0, 0, EXP.engine.width, EXP.engine.height);
		
		var tilesToDraw = [];
		
		
		for (var i = 0; i < tilesToDraw.length; i++) {
				
			EXP.engine.ctx.drawImage(this.tilesheet, tilesToDraw[i][2]*32, 0, 32, 32, Math.round(tilesToDraw[i][0]*32 + EXP.engine.width/2 - 32/2 - EXP.camera.x), Math.round(tilesToDraw[i][1]*32 + EXP.engine.height/2 - 32/2 - EXP.camera.y), 32, 32);
			
		}
	
	};

	return Room;

});