define(function () {

var Hit = {
	particles: [],
	tilesheet: new Image(),
	l: 5
};

Hit.tilesheet.src = 'images/tilesheets/effects/hit.png';

Hit.create = function (x, y) {

	var l = this.l;
		
	this.particles.push({
		x  : x - EXP.engine.TILESIZE/2,
		y  : y - EXP.engine.TILESIZE/2,
		l  : 0,
	});
	
	EXP.sound.play('hit');
		
};
	
Hit.update = function () {

	for (var i = 0; i < this.particles.length; i++) {
	
	    if(this.particles[i].l < 0){
	    	this.particles.splice(i, 1);
	    }
	    
	    this.particles[i].l++;
	    
	}
	
}

Hit.render = function () {

	if(this.particles.length < 1) return;
			
	for(var i = 0; i < this.particles.length; i++) {
		        
		EXP.engine.ctx.drawImage(
			this.tilesheet,
			EXP.engine.TILESIZE * (this.particles[i].l-1),
			0,
			EXP.engine.TILESIZE,
			EXP.engine.TILESIZE,
			Math.round(this.particles[i].x - EXP.camera.x), 
			Math.round(this.particles[i].y - EXP.camera.y),
			EXP.engine.TILESIZE,
			EXP.engine.TILESIZE
		);
	        
	}
	
};

return Hit;

});