define([
	'lib/effects/smoke',
	'lib/effects/exp',
	'lib/effects/dust',
	'lib/effects/hit',
	'lib/effects/tinyexplosion',
	'lib/effects/explosion'
], function (Smoke, Exp, Dust, Hit, Tinyexplosion, Explosion) {

	var Effects = {
	    
	    particles: [],
	    smoke: Smoke,
	    exp: Exp,
	    dust: Dust,
	    hit: Hit,
	    tinyexplosion: Tinyexplosion,
	    explosion: Explosion
	
	};
	
	Effects.add = function (effect) {
		this.particles.push(effect);		
	};
	
	Effects.remove = function (effect) {
	
		for (var i = 0; i < this.particles.length; i++) {
			if(this.particles[i].id === effect.id){
				this.particles.splice(i, 1);
			}
		}
	
	};
	
	Effects.update = function () {
	
		if(this.particles.length < 1) return;
	
		for (var i = 0; i < this.particles.length; i++) {
			this.particles[i].update();
		}
		
	}
	
	Effects.render = function () {
	
		if(this.particles.length < 1) return;
				
		for(var i = 0; i < this.particles.length; i++) {
			this.particles[i].render();
		}
		
	};
		
	return Effects;
    
});