define(function () {
	
	function Health(params) {
		
		params = params || {};
		
		this.id = new EXP.util.uid();
		this.type = 'object';
		this.label = 'health';
		this.x = params.x || 0;
		this.y = params.y || 0;
		this.collided = false;
		this.colliding = false;
		this.width = params.width || 32;
		this.height = params.height || 32;
		this.collider = {
			width: 16,
			height: 12,
			left: 8,
			top: 20
		};
		this.boost = params.boost || 10;
			
		this.sprite = new EXP.sprite({
			url: 'images/tilesheets/items/health.png',
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			animations: {
				closed: {
					x: 0,
					y: 0,
					f: 1,
					s: 1
				},
				open: {
					x: 0,
					y: 1,
					f: 1,
					s: 1
				}
			},
			currentAnimationFrame: 0
		});
		this.sprite.currentAnimation = this.sprite.animations.closed;
			
		this.update = function () {
			this.sprite.update();
		};
		
		this.render = function(){
		
			this.sprite.render();
			
			if(EXP.debug.colliders){
			
				EXP.engine.ctx.fillStyle = 'rgba(0,255,0,0.5)';
				EXP.engine.ctx.fillRect(
					Math.round(this.x + this.collider.left - EXP.camera.x),
					Math.round(this.y + this.collider.top - EXP.camera.y),
					this.collider.width,
					this.collider.height
				);
			}
		};
			
		this.onCollisionEnter = function (obj) {
		
			if(!this.collided){
				
				EXP.sound.play('health', {volume: 0.3});
				
				for (var i = 0; i < 5; i++) {
										
					setTimeout(function () {
										
						new EXP.effects.exp(obj.x + obj.width/2, obj.y, '+');
					
					}, i*100)
					
				}
			
				this.sprite.currentAnimation = this.sprite.animations.open;
				obj.health += this.boost;
				obj.health = (obj.health > obj.maxHealth)?obj.maxHealth:obj.health;
			}
		
			this.collided = true;
			this.colliding = true;
			
		};
		
		this.onCollisionExit = function (obj) {
			this.colliding = false;
		};
		
		EXP.engine.add(this);
		
	};
	
	return Health;
	
});