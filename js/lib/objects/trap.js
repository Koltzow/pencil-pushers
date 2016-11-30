define(function () {

	var Health = {};
	
	Health.create = function(params) {
		
		params = params || {};
		
		var item = {};
		
		item.x = params.x || 0;
		item.y = params.y || 0;
		item.type = 'object';
		item.label = 'health';
		item.collided = false;
		item.colliding = false;
		item.width = params.width || 32;
		item.height = params.height || 32;
		item.collider = {
			width: 16,
			height: 12,
			left: 8,
			top: 20
		};
		item.boost = params.boost || 10;
		item.tilesheet = new Image();
		item.tilesheet.src = 'images/tilesheets/items/health.png';
		item.animations = {
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
		};
		item.currentAnimation = item.animations.closed;
		item.currentAnimationFrame = 0;
		
		item.update = function () {
			
			this.currentAnimationFrame += 1/this.currentAnimation.s;
			
			if(this.currentAnimationFrame >= this.currentAnimation.f){
				this.currentAnimationFrame = 0;
			}
			
		};
		   
		item.render = function(){
		      			
			EXP.engine.ctx.drawImage(
				this.tilesheet, 
				(this.currentAnimation.x+Math.floor(this.currentAnimationFrame))*this.width, 
				this.currentAnimation.y*this.height, 
				this.width, 
				this.height, 
				Math.round(this.x - EXP.camera.x), 
				Math.round(this.y - EXP.camera.y), 
				this.width, 
				this.height
			);
			
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
		
		item.onCollisionEnter = function (obj) {
		
			if(!this.collided){
				
				EXP.sound.play('portal');
				
				for (var i = 0; i < 5; i++) {
										
					setTimeout(function () {
										
						EXP.effects.exp.add(obj.x + obj.width/2, obj.y, '-');
					
					}, i*100)
					
				}
			
				this.active = false;
				this.currentAnimation = this.animations.open;
				obj.health -= this.boost;
				obj.health = (obj.health < 0)?0:obj.health;
			}
		
			this.collided = true;
			this.colliding = true;
			
		};
		
		item.onCollisionExit = function (obj) {
			this.colliding = false;
		};
		
		item.onCollisionStay = function (obj) {};
		
		EXP.engine.add(item);
		
		return item;
		
	};
	
	return Health;
	
});