define(function () {

	var Test = {};
	
	Test.create = function () {
		
		var boss = {
			type: 'boss',
			label: 'test',
			x: EXP.engine.width/2 - 32,
			y: EXP.engine.height/2 - 32,
			width: 64,
			height: 64,
			healthbar: EXP.ui.bossbar.create(),
			health: 1000,
			maxHealth: 1000,
			colliding: false,
			collider: {
				left: 0,
				top: 0,
				width: 64,
				height: 64
			},
			tilesheet: new Image(),
			currentAnimationFrame: 0,
			animations: {
				active: {
					x: 0,
					y: 0,
					f: 2,
					s: 10
				}
			}
			
		};
		
		boss.currentAnimation = boss.animations.active;
		boss.tilesheet.src = 'images/tilesheets/boss/test.png';
		
		for (var i = 0; i < 200; i++) {
			
			(function () {
			
				var aimAngle = i*0.5 -1.5;
		
				setTimeout(function () {
					
					EXP.ammo.staple.create(boss.type, {x: boss.x + boss.width/2, y: boss.y + boss.height/2}, {x: Math.cos(aimAngle), y: Math.sin(aimAngle)});
				
				}, 100*i);
			
			})();
			
		}
				
		boss.update = function () {
		
			this.currentAnimationFrame += 1/this.currentAnimation.s;
			
			if(this.currentAnimationFrame >= this.currentAnimation.f){
				this.currentAnimationFrame = 0;
			}
		
			for (var i = 0; i < EXP.engine.bodies.length; i++) {
			
				if(EXP.engine.bodies[i].type !== 'ammo' || EXP.engine.bodies[i].firedBy !== 'player') { 
					continue; 
				}
				
				if( EXP.physics.collision.test(this, EXP.engine.bodies[i]) ){
					EXP.engine.bodies[i].onCollisionEnter(this);
				}
			}
			
			this.healthbar.target = this.health/this.maxHealth;
			this.healthbar.update();
			
		};
		
		boss.render = function () {
		
			EXP.engine.ctx.fillStyle = 'rgba(255,0,0, 1)';
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
			
			this.healthbar.render();
		
		};
		
		EXP.engine.add(boss);
		
		return boss;
		
	};

	return Test;

});