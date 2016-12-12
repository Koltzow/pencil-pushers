define(function () {

	var Camera = {
		_x: 0,
		_y: 0,
		x: 0,
		y: 0,
		centered: false,
		target: null,
		focusTarget: null,
		focusDelay:30
	};
	
	Camera.update = function () {
	
		if(this.focusTarget !== null){
		
			this._x -= (this._x - this.focusTarget.x) * 0.1;
			this._y -= (this._y - this.focusTarget.y) * 0.1;
			
			this.x = Math.round(this._x);
			this.y = Math.round(this._y);
						
			if(Math.round(this._x) === this.focusTarget.x && Math.round(this._y) === this.focusTarget.y) {
			
				if(this.focusDelay > 0) {
					this.focusDelay--; 
					return;
				}
					
				this.focusTarget = null;
				
			}
			
		} else if (this.target !== null){
					
			if (this.target instanceof Array && EXP.engine.players < 1) {
			
				this._x -= (this._x - EXP.engine.width/2) * 0.1;
				this._y -= (this._y - EXP.engine.height/2) * 0.1;
				
				this.x = Math.round(this._x);
				this.y = Math.round(this._y);
				
				this.x -= EXP.engine.width/2;
				this.y -= EXP.engine.height/2;	
			
			} else if (this.target instanceof Array) {
				
				var x = 0;
				var y = 0;
				var n = 0;
				
				for (var i = 0; i < this.target.length; i++) {
				
					if(this.target[i].player !== null && this.target[i].player instanceof Object){
					
						x += this.target[i].player.x + this.target[i].player.width/2;
						y += this.target[i].player.y + this.target[i].player.height/2;
						n++;
					
					}
					
				}
				
				x = Math.round(x/n);
				y = Math.round(y/n);
				
				this._x -= (this._x - x) * 0.1;
				this._y -= (this._y - y) * 0.1;
				
				this.x = Math.round(this._x);
				this.y = Math.round(this._y);
				
				this.x -= EXP.engine.width/2;
				this.y -= EXP.engine.height/2;
				
			} else if (this.target instanceof Object){
		
				this._x -= (this._x - (this.target.x + this.target.width/2) ) * 0.1;
				this._y -= (this._y - (this.target.y + this.target.width/2) ) * 0.1;
				
				this.x = Math.round(this._x);
				this.y = Math.round(this._y);
				
				this.x -= EXP.engine.width/2;
				this.y -= EXP.engine.height/2;
			
			}
			
			
		} else {
		
			this.x = Math.round(this._x);
			this.y = Math.round(this._y);
			
		}
	
	};
	
	Camera.follow = function (obj) {
	
		if(obj !== undefined && typeof obj === 'object') this.target = obj;
		
	};
	
	Camera.unfollow = function () {
		
		this.target = null;
		
	};
	
	Camera.setPosition = function (x, y) {
	
		this._x = x;
		this._y = y;
		this.target = null;
		this.focus = null;
	
	};
	
	Camera.shake = function (duration, i) {
		
		var intensity = i || 10;
		var counter = duration * 20 || 20;
		var shake = setInterval(function () {
		
			console.log('shake');
		
			Camera._x += Math.round(Math.random()*intensity-intensity/2);
			Camera._y += Math.round(Math.random()*intensity-intensity/2);
			
			if(counter <= 0){
				clearInterval(shake);
			}
			
			counter--;
			
			
		}, 50);
	
	}
	
	Camera.focus = function (obj, delay) {
	
		if(obj !== undefined && typeof obj === 'object') {
			this.focusTarget = obj;
		}
		
		if(delay !== undefined && typeof delay === 'number' && delay > -1) {
			this.focusDelay = delay*30;
		}
	
	};
	
	return Camera;
	
});