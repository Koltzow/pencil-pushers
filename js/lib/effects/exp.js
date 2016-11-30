define(function () {

var Exp = {
	particles: [],
	tilesheet: new Image(),
	l: 50,
	size: 10
};

Exp.tilesheet.src = 'images/tilesheets/effects/exp.png';

Exp.add = function (x, y, string) {

	x = x - 16 + Math.random()*32;
	y = y - 16 + Math.random()*32;
	var l = this.l;
		
	this.particles.push({
		x : x,
		y : y,
		l : l,
		s : string
	});
		
};
	
Exp.update = function () {

	for (var i = 0; i < this.particles.length; i++) {
	
	    this.particles[i].l--;
	    this.particles[i].y -= 1;
	    
	    if(this.particles[i].l < 0){
	    	this.particles.splice(i, 1);
	    }
	    
	}
	
}
	
Exp.render = function () {

	if(this.particles.length < 1) return false;
			
	for(var i = 0; i < this.particles.length; i++) {
			
		if(this.particles[i].s == '+'){
		
			EXP.engine.ctx.drawImage(
				this.tilesheet, 
				0, 
				0, 
				10, 
				9, 
				Math.round(this.particles[i].x - EXP.camera.x), 
				Math.round(this.particles[i].y - EXP.camera.y), 
				10, 
				9
			);
			
		} else if (this.particles[i].s == '-') {
		
			EXP.engine.ctx.drawImage(
				this.tilesheet, 
				10, 
				0, 
				10, 
				9, 
				Math.round(this.particles[i].x - EXP.camera.x), 
				Math.round(this.particles[i].y - EXP.camera.y), 
				10, 
				9
			);
			
		}
	        
	}
	
};

return Exp;

});