define(function () {

	function Stapler(parent, params) {
	
		var params = (params)?params:{};
			params = (parent)?parent:params;
						
		this.id = new EXP.util.uid();
		this.type = 'weapon';
		this.label = 'stapler';
		this.parent = parent || null;
		this.x = params.x || 0;
		this.y = params.y || 0;
		this.width = 16;
		this.height = 16;
		this.maxAmmo = 10;
		this.currentAmmo = 10;
		this.damage = 10;
		this.angle = 0;
		this.firing = 0;
		this.dir = {
			x: 1,
			y: 0
		};
		
		this.collider = new EXP.physics.collider({
			parent: this,
			width: this.width*3,
			height: this.height*3,
			left: -this.width,
			top: -this.height
		});
		
		this.sprite = new EXP.sprite({
			parent: this,
			url: 'images/tilesheets/weapons/stapler.png',
			animations: {
				default: { x:0, y:0, f:1, s:4 },
				right: {x:0, y:1, f:1, s:4},
				rightfire: {x:0, y:1, f:1, s:4},
				left: {x:0, y:2, f:1, s:4},
				leftfire: {x:0, y:2, f:1, s:4}
			}
		});

		this.fire = function () {
			
			this.firing = 4;
			
			EXP.sound.play('weapon-'+this.label+'-fire', {volume: 0.3});
		
			new EXP.ammo.staple(
				(this.parent.type || 'none'),
				{x: this.x+3, y: this.y}, 
				this.angle
			);
			
		};
		
		this.update = function (params) {
		
			if(this.parent !== null){
				this.sprite.currentAnimation = (this.angle > Math.PI/2 && this.angle < 1.5*Math.PI) ? this.sprite.animations.left:this.sprite.animations.right;
				this.angle = this.parent.aimAngle || 0;
				this.dir = {
					x: Math.cos(this.angle), 
					y: Math.sin(this.angle),
					
				};
				this.x = this.parent.x + this.parent.width/2 - this.width/2 + this.dir.x * 17;
				this.y = this.parent.y + 8 + this.dir.y*17;
			}
			
			if(this.firing){
				this.sprite.currentAnimation = (this.angle > Math.PI/2 && this.angle < 1.5*Math.PI) ? this.sprite.animations.leftfire:this.sprite.animations.rightfire;
				this.firing--;
			}
		
			this.sprite.update();
			this.collider.update();
		};
		
		this.render = function () {
			this.sprite.render();
			this.collider.render();
		}
		
		this.onTrigger = function (obj) {
		
			if (obj.type === 'player' && EXP.controller.controllers[obj.id-1].buttons[3].click) {
				
				var _this = this;
				
				setTimeout(function () {
				
					if(obj.weapon){
				
						obj.weapon.parent = null;
						obj.weapon.angle = 0;
						obj.weapon.sprite.currentAnimation = obj.weapon.sprite.animations.default;
						EXP.engine.add(obj.weapon);
					
					}
					
					EXP.engine.remove(_this);
					_this.parent = obj;
					obj.weapon = _this;
					
					
				}, 10);
			
			}
			
		};
		
		if(this.parent === null){
			EXP.engine.add(this);
		}
	
	}
	
	return Stapler;
	
});