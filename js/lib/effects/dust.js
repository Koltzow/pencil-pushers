define(function () {

var Dust = {
	particles: [],
	l: 20,
	s: 0,
	c: ['rgba(255,255,255,1)'],
	skip: 3
};

Dust.add = function (x, y) {

	if(this.skip > 0) {
		this.skip--;
		return;
	}
	
	this.skip = 6;
	
	var d = Math.random()*2*Math.PI;
	var s = Math.random()*this.s;
	var l = this.l;
		
	this.particles.push({
		x  : x,
		y  : y,
		l  : l,
		r  : s,
		c  : this.c[Math.floor(Math.random() * this.c.length)]
	});
		
};
	
Dust.update = function () {

	for (var i = 0; i < this.particles.length; i++) {
	
	    this.particles[i].l--;
	    this.particles[i].r += Math.random()/2;
	    this.particles[i].y -= Math.random()/2;
	    this.particles[i].x += Math.random()*2-1;
	    
	    var l = (0.2/this.l * this.particles[i].l);
	    	    	    
	    this.particles[i].c = 'rgba(255,255,255, '+l+')';
	    
	    if(this.particles[i].l < 0){
	    	this.particles.splice(i, 1);
	    }
	    
	}
	
}
	
Dust.render = function () {

	if(this.particles.length < 1) return false;
			
	for(var i = 0; i < this.particles.length; i++) {
		        
		EXP.engine.ctx.fillStyle = this.particles[i].c;
		EXP.engine.ctx.fillRect(
			Math.round(this.particles[i].x - EXP.camera.x), 
			Math.round(this.particles[i].y - EXP.camera.y),
			Math.round(this.particles[i].r), 
			Math.round(this.particles[i].r)
		);
	        
	}
	
};

return Dust;

});