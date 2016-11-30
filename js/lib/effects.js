define([
	'lib/effects/smoke',
	'lib/effects/exp',
	'lib/effects/dust',
	'lib/effects/hit'
], function (Smoke, Exp, Dust, Hit) {

	var Effects = {
	    
	    smoke: Smoke,
	    exp: Exp,
	    dust: Dust,
	    hit: Hit
	
	};
	
	Effects.update = function () {
	
		this.smoke.update();
		this.exp.update();
		this.dust.update();
		this.hit.update();
	
	};
	
	Effects.render = function () {
		
		this.smoke.render();
		this.exp.render();
		this.dust.render();
		this.hit.render();
		
	};
		
	return Effects;
    
});