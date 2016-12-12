define(function () {

	function Exp(x, y, string) {
		
		this.id = new EXP.util.uid();
		this.sprite = new Image();
		this.sprite.src = 'images/tilesheets/effects/exp.png';
		this.x = x - 16 + Math.random()*32;
		this.y = y - 16 + Math.random()*32;
		this.life = 0;
		this.maxLife = 50;
		this.s = string || '-';
		this.width = 10;
		this.height = 9;
			
		this.update = function () {
			
		    if(this.life >= this.maxLife){
		    	EXP.effects.remove(this);
		    }
		    
		    this.life++;
		    this.y--;
			    
		};
			
		this.render = function () {
		
			var offset = (this.s == '-') ? this.width : 0;
			
			EXP.engine.ctx.drawImage(
				this.sprite, 
				offset, 
				0, 
				this.width, 
				this.height, 
				Math.round(this.x - EXP.camera.x), 
				Math.round(this.y - EXP.camera.y), 
				this.width, 
				this.height
			);
				        			
		};
		
		EXP.effects.add(this);
			
	};
	
	return Exp;

});