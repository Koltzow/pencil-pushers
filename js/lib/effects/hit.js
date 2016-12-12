define(function () {

	function Hit(x, y) {
		
		this.id = new EXP.util.uid();
		this.sprite = new Image(); 
		this.type = 'effect';
		this.label = 'hit';
		this.sprite.src = 'images/tilesheets/effects/'+this.label+'.png';
		this.width = 32;
		this.height = 32;
		this.x = x - this.width/2;
		this.y = y - this.height/2;
		this.life = 0;
		this.maxLife = 5;
		this.animated = true;
		
		this.update = function () {
		
			if(this.life >= this.maxLife){
				EXP.effects.remove(this);
			}
			
			this.life += 1/2;
		
		};
		
		this.render = function () {
				
			EXP.engine.ctx.drawImage(
				this.sprite,
				this.width * (Math.floor(this.life) * this.animated),
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
		EXP.sound.play('hit', {volume: 0.3});
			
	};
		
	return Hit;

});