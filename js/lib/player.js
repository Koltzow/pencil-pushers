define(function () {

	var Player = {};
	
	Player.create = function(params) {
	
	
		if(EXP.engine.players >= EXP.engine.maxPlayers) {
			console.log('ENGINE: Max players'); 
			return;
		}
	
		params = params || {};
	
		var char = {};
		
		
		char.id = EXP.engine.players+1;
		char.colors = ['#43ffa3', '#f526af', '#23b1ff', '#ff961a'];
		char.color = char.colors[char.id-1];
		char.controllable = params.controllable || true;
		char.type = 'player';
		char.label = 'astronaut';
		char.width = params.width || 32;
		char.height = params.height || 32;
		
		var pos = [
			[40,60], 
			[EXP.engine.width-char.width-40, 60],
			[EXP.engine.width-char.width-40, EXP.engine.height-char.height-60],
			[40, EXP.engine.height-char.height-60]
		];
		
		char.x = params.x || pos[char.id-1][0];
		char.y = params.y || pos[char.id-1][1];
		char.z = params.z || 0;
		
		
		char.vz = 0;
		char.shield = 100;
		char.maxShield = 100;
		char.healthbar = EXP.ui.healthbar.create(char.id);
		char.health = 50;
		char.maxHealth = 100;
		char.speed = 1;
		char.diagonalSpeed = 1;
		char.collider = {
			width: 10,
			height: 10,
			left: 11,
			top: 25
		};
		char.dir = {x:0, y:0};
		char.inventoryLimit = 6;
		char.inventory = [];
		char.history = [];
		char.maxHistory = 20;
		char.step = false;
		char.walking = false;
		char.jumping = false;
		char.shooting = false;
		char.aimDist = 50;
		char.aimAngle = 270;
		char.aim = new Image();
		char.aim.src = 'images/tilesheets/player/aim.png';
		char.footsteps = new Image();
		char.footsteps.src = 'images/tilesheets/player/footsteps.png';
		char.indicator = new Image();
		char.indicator.src = 'images/tilesheets/player/indicator.png';
		char.shadow = new Image();
		char.shadow.src = 'images/tilesheets/player/shadow.png';
		char.tilesheet = new Image();
		char.tilesheet.src = 'images/tilesheets/player/guy.png';
		char.animations = {
			idle: {
				right:		{ x:0, y:0, f:1, s:1 },
				down:		{ x:1, y:0, f:1, s:1 },
				left:		{ x:2, y:0, f:1, s:1 },
				up:			{ x:3, y:0, f:1, s:1 }
			},
			walking: {
				right:		{ x:0, y:1, f:4, s:2 },
				downright:	{ x:0, y:2, f:4, s:2 },
				down:		{ x:0, y:3, f:4, s:2 },
				downleft:	{ x:0, y:4, f:4, s:2 },
				left:		{ x:0, y:5, f:4, s:2 },
				upleft:		{ x:0, y:6, f:4, s:2 },
				up:			{ x:0, y:7, f:4, s:2 },
				upright:	{ x:0, y:8, f:4, s:2 }
			},
			dead: {
				x:0, y:9, f:1, s:1
			}
		};
		char.currentAnimation = char.animations.idle.down;
		char.currentAnimationFrame = 0;
		
		EXP.ui.inventorybar.targetInventory = char.inventory;
		
		char.update = function () {
		
			if(this.disabled) return;
							
			if(this.controllable){
			
				var x = this.x;
				var y = this.y;
				
				var dir = EXP.controller.controllers[this.id-1].dir;
				var altSpeed = false;
				
				if(dir.x !== 0 || dir.y !== 0){
					
					if(
						!this.walking && 
						Math.round(this.z) === 0
					){ 
						this.walking = true;
					}
					
					if(dir.x > 0 && dir.y == 0){ 
						this.currentAnimation = this.animations.walking.right; 
					} else if(dir.x > 0 && dir.y > 0) { 
						this.currentAnimation = this.animations.walking.downright; 
						altSpeed = this.diagonalSpeed;
					} else if(dir.x == 0 && dir.y > 0){ 
						this.currentAnimation = this.animations.walking.down; 
					} else if(dir.x < 0 && dir.y > 0) { 
						this.currentAnimation = this.animations.walking.downleft;
						altSpeed = this.diagonalSpeed;
					} else if(dir.x < 0 && dir.y == 0){ 
						this.currentAnimation = this.animations.walking.left; 
					} else if(dir.x < 0 && dir.y < 0) { 
						this.currentAnimation = this.animations.walking.upleft;
						altSpeed = this.diagonalSpeed;	
					} else if(dir.x == 0 && dir.y < 0){ 
						this.currentAnimation = this.animations.walking.up; 
					} else if(dir.x > 0 && dir.y < 0) { 
						this.currentAnimation = this.animations.walking.upright;
						altSpeed = this.diagonalSpeed;
					}
					
					this.dir.x = dir.x;
					this.dir.y = dir.y;
					
					this.x += this.dir.x * (altSpeed || this.speed);
					this.y += this.dir.y * (altSpeed || this.speed);
										
				} else {
				
					EXP.sound.stop('footsteps');
					this.walking = false;
								
					//standing
					if(this.dir.y > 0){ this.currentAnimation = this.animations.idle.down } else 
					if(this.dir.y < 0){	this.currentAnimation = this.animations.idle.up } else 
					if(this.dir.x > 0){ this.currentAnimation = this.animations.idle.right } else {
						this.currentAnimation = this.animations.idle.left;
					}
					
				}
				
				if(
					Math.round(EXP.controller.controllers[this.id-1].sticks[2]) !== 0 ||
					Math.round(EXP.controller.controllers[this.id-1].sticks[3]) !== 0
				){
					this.aimAngle = Math.atan2(
						EXP.controller.controllers[this.id-1].sticks[2], 
						EXP.controller.controllers[this.id-1].sticks[3]
					)*-1+1.5;
				}
				
				if (
					EXP.controller.controllers[this.id-1].buttons[6].pressed && 
					EXP.controller.controllers[this.id-1].buttons[6].value > 0.5
				){
					this.aimDist = 150;
				} else {
					this.aimDist = 50;
				}
												
				if (
					EXP.controller.controllers[this.id-1].buttons[7].pressed && 
					EXP.controller.controllers[this.id-1].buttons[7].value > 0.5
				) {
					
					if(!this.shooting) {
						
						this.shooting = true;
						
						EXP.ammo.staple.create(
							this.type,
							{x: this.x+14, y:this.y+8}, 
							{x: Math.cos(this.aimAngle), y: Math.sin(this.aimAngle)}
						);
					}
					
				} else {
					this.shooting = false;
				}	
				
			}
								
			
			//gravity
			this.vz += 1;
			
			this.z -= this.vz;
			
			if(this.z < 0){
				this.z = 0;
				this.vz = 0;
			} else if (this.z > 100) {
				this.z = 100;
				this.vz = 0;
			}

			
			this.currentAnimationFrame += 1/this.currentAnimation.s;
			
			if(this.currentAnimationFrame >= this.currentAnimation.f){
				this.currentAnimationFrame = 0;
			}
			
			var colliding = false;
			
			for (var i = 0; i < EXP.engine.bodies.length; i++) {
				
				if(
					EXP.engine.bodies[i] === this || 
					EXP.engine.bodies[i].type === 'player' || 
					(EXP.engine.bodies[i].type === 'ammo' && EXP.engine.bodies[i].firedBy === 'player') ||
					EXP.engine.bodies[i].disabled
				) { 
					continue; 
				}
				
				if( EXP.physics.collision.test(this, EXP.engine.bodies[i]) ){
					
					if(
						EXP.engine.bodies[i].onCollisionEnter !== undefined && 
						!EXP.engine.bodies[i].colliding
					) { 
						EXP.engine.bodies[i].onCollisionEnter(this); 
					}
					
					if( EXP.engine.bodies[i].onCollisionStay !== undefined ) { 
						EXP.engine.bodies[i].onCollisionStay(this); 
					}
					
					if( 
						EXP.engine.bodies[i].isTrigger !== undefined && 
						EXP.engine.bodies[i].isTrigger
					) {
						continue;
					}
					
					colliding = true;
					
				} else {
				
					if(
						EXP.engine.bodies[i].onCollisionExit !== undefined && 
						EXP.engine.bodies[i].colliding
					){
						EXP.engine.bodies[i].onCollisionExit(this);
					}
					
				}
			}
			
			if(colliding){
				this.x = x;
				this.y = y;
			}
			
			if(
				this.x < 0 ||
				this.x + this.width > EXP.engine.width ||
				this.y < 0 ||
				this.y + this.height > EXP.engine.height
			){
			
				if(this.x < 0) this.x = 0;
				if(this.x + this.width > EXP.engine.width) this.x = EXP.engine.width - this.width;
				if(this.y < 0) this.y = 0;
				if(this.y + this.height > EXP.engine.height) this.y = EXP.engine.height - this.height;
				
			}
			
			var x = this.x;
			var y = this.y;
			
			if(this.walking){
				EXP.effects.dust.add(x+this.width/2, y+this.height);
			}
			
			if(this.health <= 0 && this.currentAnimation !== this.animations.dead) {
				
				EXP.sound.play('death');
				EXP.camera.shake();
				this.health = 0;
				this.controllable = false;
				this.walking = false;
				this.currentAnimation = this.animations.dead;
			}
			
			this.healthbar.target = this.health/this.maxHealth;
			this.healthbar.update();
			
		};
		
		char.render = function () {
			
			if(this.walking){
				this.step = !this.step;
			}
			
			EXP.engine.ctx.drawImage(
				this.indicator, 
				9*(this.id-1), 
				0, 
				9, 
				5, 
				Math.round(this.x + 12 - EXP.camera.x), 
				Math.round(this.y-10 - EXP.camera.y), 
				9, 
				5
			);
			
			EXP.engine.ctx.drawImage(
				this.shadow, 
				0, 
				0, 
				32, 
				5, 
				Math.round(this.x - EXP.camera.x), 
				Math.round(this.y+29 - EXP.camera.y), 
				32, 
				5
			);
			
			if(this.health > 0) {
			
				EXP.engine.ctx.drawImage(
					this.aim,
					9*(this.id-1),
					0,
					9,
					9,
					Math.round(this.x + this.width/2 + Math.cos(this.aimAngle)*this.aimDist - EXP.camera.x) - 4,
					Math.round(this.y + this.height/2 + Math.sin(this.aimAngle)*this.aimDist - EXP.camera.y) - 4 - 6,
					9,
					9
				);
				
			}
					
			EXP.engine.ctx.drawImage(
				this.tilesheet, 
				(this.currentAnimation.x+Math.floor(this.currentAnimationFrame))*this.width, 
				this.currentAnimation.y*this.height, 
				this.width, 
				this.height, 
				Math.round(this.x  - EXP.camera.x), 
				Math.round(this.y - this.z - EXP.camera.y), 
				this.width, 
				this.height
			);
			
			if(EXP.debug.colliders){
				EXP.engine.ctx.fillStyle = 'rgba(0,255,0,0.5)';
				EXP.engine.ctx.fillRect(
					Math.round(this.x + this.collider.left + EXP.camera.x),
					Math.round(this.y + this.collider.top - this.z + EXP.camera.y),
					this.collider.width,
					this.collider.height
				);
			}
			
			this.healthbar.render();
		
		};
		
		EXP.engine.add(char);
		EXP.engine.players++;		
		
		return char;
		
	};
	
	return Player;
	
});