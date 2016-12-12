define(function () {
	
	function Explosion(x, y) {

		this.id = new EXP.util.uid();
		this.sprite = new Image();
		this.type = 'effect';
		this.label = 'explosion';
		this.sprite.src = 'images/tilesheets/effects/'+this.label+'.png';
		this.width = 12;
		this.height = 12;
		this.x = x - this.width/2;
		this.y = y - this.height/2;
		this.life = 0;
		this.maxLife = 3;
		this.animated = true;
		
		this.update = function () {
			
			if(this.life >= this.maxLife){
				EXP.effects.remove(this);
			}
			
			this.life += 1/4;
			
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
	
	return Explosion;

});