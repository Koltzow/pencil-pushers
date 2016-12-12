define(function () {

	function Sprite(params) {
	
		var params = params || {};
			
		this.parent = params.parent || null;
		this.type = 'sprite';
		this.url = params.url || 'images/tilesheets/default.png';
		this.tilesheet = new Image();
		this.tilesheet.src = this.url;
		this.animations = params.animations || {
			default: {x: 0, y: 0, f: 1, s: 1}
		};
		this.currentAnimation = this.animations.default;
		this.currentAnimationFrame = 0;
		this.x = params.x || 0;
		this.y = params.y || 0;
		this.width = params.width || 0;
		this.height = params.height || 0;
		this.angle = 0;
		
		this.update = function () {
		
			if(this.parent !== null) {
				this.x = this.parent.x;
				this.y = this.parent.y;
				this.width = this.parent.width;
				this.height = this.parent.height;
				this.angle = this.parent.angle || 0;
			}
		
			this.currentAnimationFrame += 1/this.currentAnimation.s;
			
			if(this.currentAnimationFrame >= this.currentAnimation.f){
				this.currentAnimationFrame = 0;
			}
		
		};
		
		this.render = function () {
									
			if(this.angle !== 0){
								
				EXP.engine.ctx.translate(Math.round(this.x - EXP.camera.x + this.width/2), Math.round(this.y - EXP.camera.y + this.height/2));
				EXP.engine.ctx.rotate(this.angle);
				EXP.engine.ctx.drawImage(
					this.tilesheet, 
					(this.currentAnimation.x+Math.floor(this.currentAnimationFrame))*this.width, 
					this.currentAnimation.y*this.height, 
					this.width, 
					this.height, 
					-this.width/2, 
					-this.height/2, 
					this.width, 
					this.height
				);
				EXP.engine.ctx.rotate(-this.angle);
				EXP.engine.ctx.translate(-Math.round(this.x - EXP.camera.x + this.width/2), -Math.round(this.y - EXP.camera.y + this.height/2));
			
			} else {
				
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
				
			}					
			
		
		};
			
	}
	
	return Sprite

});