define(function () {
	
	function Bouncelazer(type, pos, angle, strength) {
			
		this.id = new EXP.util.uid();
		this.type = 'ammo';
		this.label = 'bouncelazer';
		this.x = pos.x || 0;
		this.y = pos.y || 0;
		this.angle = angle;
		this.bounces = 2;
		this.dir = {
			x: Math.cos(angle), 
			y: Math.sin(angle)
		};
		this.strength = 4;
		this.life = 200;
		this.firedBy = type || 'none';
		this.width = 10;
		this.height = 10;
		this.damage = 100;
		
		this.collider = new EXP.physics.collider({
			parent: this,
			width: this.width,
			height: this.height
		});
		
		this.sprite = new EXP.sprite({
			parent: this,
			url: 'images/tilesheets/'+this.type+'/'+this.label+'.png'
		});
		
		this.update = function () {
					
			this.x += this.dir.x*this.strength;
			this.y += this.dir.y*this.strength;
									
			this.sprite.update();
			this.collider.update();
			
			this.life--;
			
			if(this.life <= 0){
				EXP.engine.remove(this);
				return;
			}
			
			for (var i = 0; i < EXP.engine.bodies.length; i++) {
							
				if( EXP.engine.bodies[i].type !== 'object') {
					continue;
				}
				
				if(EXP.physics.collision.test(this, EXP.engine.bodies[i]) !== false){
					new EXP.effects.hit(this.x, this.y);
										
					if(this.bounces <= 0){
						EXP.engine.remove(this);
						return;
					}
					
					this.bounces--;
					
					var side = EXP.physics.collision.test(this, EXP.engine.bodies[i]);
					
					if(side === 'top'){
						this.dir.y = Math.abs(this.dir.y) * -1;
					} else if(side === 'bottom'){
						this.dir.y = Math.abs(this.dir.y);
					} else if (side === 'right'){
						this.dir.x = Math.abs(this.dir.x);
					} else if(side === 'left') {
						this.dir.x = Math.abs(this.dir.x) * -1;
					}
					
					this.angle = Math.atan2(this.dir.y, this.dir.x);
					this.x += this.dir.x*this.strength*2;
					this.y += this.dir.y*this.strength*2;
				}
			}
		
		};
		
		this.onCollisionEnter = function (obj) {
		
			obj.health -= this.damage;
			EXP.engine.remove(this);
			
			new EXP.effects.exp(this.x, this.y, '-');
			new EXP.effects.hit(this.x, this.y);
			
		};
		
		this.render = function () {
			this.sprite.render();
			this.collider.render();
		};
		
		EXP.engine.add(this);
			
	}
	
	return Bouncelazer;
	
});