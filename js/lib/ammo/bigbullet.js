define(function () {

	function Bigbullet(type, pos, angle, strength) {
			
		this.id = new EXP.util.uid();
		this.type = 'ammo';
		this.label = 'bigbullet';
		this.x = pos.x || 0;
		this.y = pos.y || 0;
		this.angle = angle;
		this.dir = {
			x: Math.cos(angle), 
			y: Math.sin(angle)
		};
		this.strength = 8;
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
				
				if(EXP.physics.collision.test(this, EXP.engine.bodies[i])){
					EXP.engine.remove(this);
					new EXP.effects.explosion(this.x + this.width/2, this.y + this.height/2);
				}
			}
		
		};
		
		this.onCollisionEnter = function (obj) {
			
			obj.health -= this.damage;
			EXP.engine.remove(this);
			
			//new EXP.effects.exp(this.x + this.width/2, this.y + this.height/2, '-');
			new EXP.effects.explosion(this.x + this.width/2, this.y + this.height/2);
			
		};
		
		this.render = function () {
			this.sprite.render();
			this.collider.render();
		};
		
		EXP.engine.add(this);
			
	}
	
	return Bigbullet;
	
});