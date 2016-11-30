define(function () {

	var Portal = {};
	
	Portal.create = function(params) {
		
		params = params || {};
		
		var object = {};
		
		object.x = params.x || 0;
		object.y = params.y || 0;
		object.type = 'object';
		object.label = 'portal';
		object.hidden = false;
		object.disabled = false;
		object.width = 32;
		object.height = 64;
		object.collided = false;
		object.colliding = false;
		object.collider = {
			width: 32,
			height: 32,
			top: 32,
			left: 0
		};
		object.isTrigger = true;
		object.tilesheet = new Image();
		object.tilesheet.src = 'images/tilesheets/items/portal.png';
		object.animations = {
			active: {
				x: 0,
				y: 0,
				f: 3,
				s: 4
			}
		};
		object.currentAnimation = object.animations.active;
		object.currentAnimationFrame = 0;
		
		object.update = function () {
			
			this.currentAnimationFrame += 1/this.currentAnimation.s;
			
			if(this.currentAnimationFrame >= this.currentAnimation.f){
				this.currentAnimationFrame = 0;
			}
			
		};
		   
		object.render = function(){
		
			if(this.hidden) return;
		      		
			EXP.engine.ctx.drawImage(this.tilesheet, (this.currentAnimation.x+Math.floor(this.currentAnimationFrame))*this.width, this.currentAnimation.y*this.height, this.width, this.height, Math.round(this.x + EXP.engine.width/2 - this.width/2 - EXP.camera.x), Math.round(this.y + EXP.engine.height/2 - this.width/2 - EXP.camera.y), this.width, this.height);
			
			if(EXP.debug.colliders){
			
				EXP.engine.ctx.fillStyle = 'rgba(0,255,0,0.5)';
				EXP.engine.ctx.fillRect(
					Math.round(this.x + this.collider.left + EXP.engine.width/2 - this.width/2 - EXP.camera.x),
					Math.round(this.y + this.collider.top + EXP.engine.height/2 - this.width/2 - EXP.camera.y),
					this.collider.width,
					this.collider.height
				);
			}
		};
		
		object.onCollisionEnter = function (obj) {
		
			if(!this.collided){
			
				this.hidden = true;
				
				EXP.sound.play('portal');
					
				for (var i = 0; i < 5; i++) {
									
					setTimeout(function () {
										
						EXP.effects.exp.add(obj.x, obj.y-16, '-');
					
					}, i*100)
					
				}
			
				EXP.planet.create();
			}
		
			this.collided = true;
			this.colliding = true;
			
		};
		
		object.onCollisionExit = function (obj) {
			this.colliding = false;
		};
		
		object.onCollisionStay = function (obj) {};
		
		return object;
		
	};
	
	return Portal;
	
});