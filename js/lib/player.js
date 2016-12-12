define(function () {

	
	function Player(params) {
	
	
		if(EXP.engine.players >= EXP.engine.maxPlayers) {
			console.log('ENGINE: Max players'); 
			return;
		}
	
		params = params || {};
			
		this.id = EXP.engine.players+1;
		this.colors = ['#43ffa3', '#f526af', '#23b1ff', '#ff961a'];
		this.color = this.colors[this.id-1];
		this.controllable = params.controllable || true;
		this.type = 'player';
		this.label = params.label || 'default';
		this.width = params.width || 32;
		this.height = params.height || 32;
		
		var pos = [
			[40,60], 
			[EXP.engine.width-this.width-40, 60],
			[EXP.engine.width-this.width-40, EXP.engine.height-this.height-60],
			[40, EXP.engine.height-this.height-60]
		];
		
		this.x = params.x || pos[this.id-1][0];
		this.y = params.y || pos[this.id-1][1];
		
		this.shield = 100;
		this.maxShield = 100;
		this.healthbar = EXP.ui.healthbar.create(this.id);
		this.health = 100;
		this.maxHealth = 100;
		this.speed = 1;
		this.dead = false;
		this.diagonalSpeed = 1;
		this.collider = new EXP.physics.collider({
			parent: this,
			width: 10,
			height: 10,
			left: 11,
			top: 25
		});
		this.weapon = new EXP.weapons.pistol(this);
		this.dir = {x:0, y:0};
		this.inventoryLimit = 6;
		this.inventory = [];
		this.history = [];
		this.maxHistory = 20;
		this.step = false;
		this.walking = false;
		this.jumping = false;
		this.shooting = false;
		this.aimDist = 50;
		this.aimAngle = 0;
		this.aim = new Image();
		this.aim.src = 'images/tilesheets/player/aim.png';
		this.footsteps = new Image();
		this.footsteps.src = 'images/tilesheets/player/footsteps.png';
		this.indicator = new Image();
		this.indicator.src = 'images/tilesheets/player/indicator.png';
		this.shadow = new Image();
		this.shadow.src = 'images/tilesheets/player/shadow.png';
		this.sprite = new EXP.sprite({
			parent: this,
			url: 'images/tilesheets/player/player.png',
			animations: {
				idle: {
					right:		{ x:0, y:0, f:1, s:1 },
					down:		{ x:1, y:0, f:1, s:1 },
					left:		{ x:2, y:0, f:1, s:1 },
					up:			{ x:3, y:0, f:1, s:1 }
				},
				walking: {
					right:		{ x:0, y:1, f:4, s:4 },
					downright:	{ x:0, y:2, f:4, s:4 },
					down:		{ x:0, y:3, f:4, s:4 },
					downleft:	{ x:0, y:4, f:4, s:4 },
					left:		{ x:0, y:5, f:4, s:4 },
					upleft:		{ x:0, y:6, f:4, s:4 },
					up:			{ x:0, y:7, f:4, s:4 },
					upright:	{ x:0, y:8, f:4, s:4 }
				},
				dead: {
					x:0, y:9, f:1, s:1
				}
			}
		});
		this.sprite.currentAnimation = this.sprite.animations.idle.down;
		
		EXP.ui.inventorybar.targetInventory = this.inventory;
		
		this.update = function () {
		
			var x = this.x;
			var y = this.y;
		
			if(this.controllable){
						
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
						this.sprite.currentAnimation = this.sprite.animations.walking.right; 
					} else if(dir.x > 0 && dir.y > 0) { 
						this.sprite.currentAnimation = this.sprite.animations.walking.downright; 
						altSpeed = this.diagonalSpeed;
					} else if(dir.x == 0 && dir.y > 0){ 
						this.sprite.currentAnimation = this.sprite.animations.walking.down; 
					} else if(dir.x < 0 && dir.y > 0) { 
						this.sprite.currentAnimation = this.sprite.animations.walking.downleft;
						altSpeed = this.diagonalSpeed;
					} else if(dir.x < 0 && dir.y == 0){ 
						this.sprite.currentAnimation = this.sprite.animations.walking.left; 
					} else if(dir.x < 0 && dir.y < 0) { 
						this.sprite.currentAnimation = this.sprite.animations.walking.upleft;
						altSpeed = this.diagonalSpeed;	
					} else if(dir.x == 0 && dir.y < 0){ 
						this.sprite.currentAnimation = this.sprite.animations.walking.up; 
					} else if(dir.x > 0 && dir.y < 0) { 
						this.sprite.currentAnimation = this.sprite.animations.walking.upright;
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
					if(this.dir.y > 0){ this.sprite.currentAnimation = this.sprite.animations.idle.down } else 
					if(this.dir.y < 0){	this.sprite.currentAnimation = this.sprite.animations.idle.up } else 
					if(this.dir.x > 0){ this.sprite.currentAnimation = this.sprite.animations.idle.right } else {
						this.sprite.currentAnimation = this.sprite.animations.idle.left;
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
					EXP.controller.controllers[this.id-1].buttons[6] !== undefined &&
					EXP.controller.controllers[this.id-1].buttons[6].pressed && 
					EXP.controller.controllers[this.id-1].buttons[6].value > 0.5
				){
					this.aimDist = 150;
				} else {
					this.aimDist = 50;
				}
												
				if (
					EXP.controller.controllers[this.id-1].buttons[7] !== undefined &&
					EXP.controller.controllers[this.id-1].buttons[7].pressed && 
					EXP.controller.controllers[this.id-1].buttons[7].value > 0.5
				) {
					
					if(!this.shooting) {
						this.shooting = true;
						this.weapon.fire();
					}
					
				} else {
					this.shooting = false;
				}	
				
			}
						
			this.sprite.update({x: this.x, y: this.y});
			this.collider.update();	
			this.weapon.update();
					
			var colliding = false;
			
			for (var i = 0; i < EXP.engine.bodies.length; i++) {
				
				if(
					EXP.engine.bodies[i] === this || 
					EXP.engine.bodies[i].type === 'player' || 
					(EXP.engine.bodies[i].type === 'ammo' && EXP.engine.bodies[i].firedBy === 'player') ||
					this.dead
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
					
					if( EXP.engine.bodies[i].onTrigger !== undefined ) {
						EXP.engine.bodies[i].onTrigger(this);
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
			
			if(this.health <= 0){
			
				this.health = 0;
				
				if(!this.dead) {
				
					console.log('die');
					this.dead = true;
					this.sprite.currentAnimation = this.sprite.animations.dead;
					EXP.sound.play('death');
					EXP.camera.shake();
					this.controllable = false;
					this.walking = false;
				
				}
			}
			
			this.healthbar.target = this.health/this.maxHealth;
			
		};
		
		this.render = function () {
					
			if(this.walking){
				this.step = !this.step;
			}
			
			EXP.engine.ctx.drawImage(
				this.indicator, 
				11*(this.id-1), 
				0, 
				11, 
				7, 
				Math.round(this.x + 11 - EXP.camera.x), 
				Math.round(this.y-10 - EXP.camera.y), 
				11, 
				7
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
					11*(this.id-1),
					0,
					11,
					11,
					Math.round(this.x + this.width/2 + Math.cos(this.aimAngle)*this.aimDist - EXP.camera.x) - 4,
					Math.round(this.y + this.height/2 + Math.sin(this.aimAngle)*this.aimDist - EXP.camera.y) - 4 - 6,
					11,
					11
				);
				
			}
								
			this.sprite.render();
			this.weapon.render();
			this.collider.render();
					
		};
		
		EXP.engine.add(this);
		EXP.engine.players++;		
		
		return this;
		
	};
	
	return Player;
	
});