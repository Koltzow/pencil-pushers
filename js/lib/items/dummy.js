define(function () {

	var Dummy = {};
	
	Dummy.create = function(params) {
		
		params = params || {};
		
		var item = {};
		
		item.x = params.x || 0;
		item.y = params.y || 0;
		item.label = 'dummy';
		item.type = 'item';
		item.width = EXP.engine.TILESIZE;
		item.height = EXP.engine.TILESIZE;
		item.hidden = false;
		item.disabled = false;
		item.collectable = true;
		item.isTrigger = false;
		item.collided = false;
		item.colliding = false;
		item.collider = {
			width: 18,
			height: 4,
			left: 7,
			top: 18
		};
		item.tilesheet = new Image();
		item.tilesheet.src = 'images/tilesheets/items/rock.png';
		item.animations = {
			active: {
				x: 0,
				y: 0,
				f: 1,
				s: 4
			}
		};
		item.currentAnimation = item.animations.active;
		item.currentAnimationFrame = 0;
		
		item.update = function () {
		
			if(this.disabled) return;
		
			if(this.currentAnimation.f > 1){
			
				this.currentAnimationFrame += 1/this.currentAnimation.s;
				
				if(this.currentAnimationFrame >= this.currentAnimation.f){
					this.currentAnimationFrame = 0;
				}
			
			} else {
				this.currentAnimationFrame = 0;
			}
			
		};
		   
		item.render = function(){
		
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
		
		item.onCollisionEnter = function (obj) {
		
			if(!this.collided){
				console.log('picked up '+ this.label);
				
				EXP.sound.play('health');
				
				if(obj.inventory !== undefined) {
					obj.inventory.push(this);
					this.disabled = true;
					this.hidden = true;
				}
			}
		
			this.collided = true;
			this.colliding = true;
			
		};
		
		item.onCollisionExit = function (obj) {
			this.colliding = false;
		};
		
		item.onCollisionStay = function (obj) {};
		
		return item;
		
	};
	
	return Dummy;
	
});