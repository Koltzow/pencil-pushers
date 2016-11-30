define(function () {

	var Staple = {};
	
	Staple.create = function (type, pos, dir, strength) {
	
		var staple = {
			id: (new Date()).getTime(),
			type: 'ammo',
			label: 'staple',
			x: pos.x || 0, 
			y: pos.y || 0,
			dir: dir || {x: -1, y:0},
			strength: strength || 6,
			life: 100,
			firedBy: type || 'none',
			width: 4,
			height: 4,
			collider: {
				top: 0,
				left: 0,
				width: 4,
				height: 4
			},
			damage: 10,
			tilesheet: new Image()
		};
		
		staple.x += dir.x*5;
		staple.y += dir.y*5
		
		staple.tilesheet.src = 'images/tilesheets/ammo/staple.png';
		
		staple.update = function () {
					
			this.x += this.dir.x*this.strength;
			this.y += this.dir.y*this.strength;
						
			this.life--;
			
			if(this.life <= 0){
				
				this.remove();
				
				return;
			}
			
			for (var i = 0; i < EXP.engine.bodies.length; i++) {
							
				if( EXP.engine.bodies[i].type !== 'object') {
					continue;
				}
				
				if(EXP.physics.collision.test(this, EXP.engine.bodies[i])){
					EXP.effects.hit.create(this.x, this.y);
					this.remove();
				}
			}
		
		};
		
		staple.onCollisionEnter = function (obj) {
			this.remove();
			EXP.effects.exp.add(this.x, this.y, '-');
			EXP.effects.hit.create(this.x, this.y);
			obj.health -= this.damage;
			
		};
		
		staple.remove = function () {
		
			for (var i = 0; i < EXP.engine.bodies.length; i++) {
				if(EXP.engine.bodies[i].id === this.id){
					EXP.engine.bodies.splice(i, 1);
				}
			}
		
		};
		
		staple.render = function () {
		
			EXP.engine.ctx.fillStyle = 'rgb(255,0,0)';
			EXP.engine.ctx.drawImage(
				this.tilesheet,
				Math.round(this.x - EXP.camera.x),
				Math.round(this.y - EXP.camera.y),
				this.width,
				this.height
			);
			
			if(EXP.debug.colliders){
			
				EXP.engine.ctx.fillStyle = 'rgba(0,255,0,0.5)';
				EXP.engine.ctx.fillRect(
					Math.round(this.x - EXP.camera.x),
					Math.round(this.y - EXP.camera.y),
					this.width,
					this.height
				);
			}
		
		};

		EXP.sound.play('stapler', {volume: 0.5});
		EXP.engine.bodies.push(staple);
		
		return staple;
	
	}
	
	return Staple;
	
});