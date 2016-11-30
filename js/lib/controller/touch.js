define(function () {

	var Touch = {
	    
	    supported: 'ontouchstart' in window,
	    enabled: false,
	    radius: 10,
	    threshold: 20,
	    pos: {
	    	start: null,
	   		move: null
	   	},
	    dir: {
	    	x: 0,
	    	y: 0
	    },
	    joystick: null,
	    boost: null,
	    listeners: []
	
	};
	
	Touch.start = function(e) {
	
		e.preventDefault();
				
		if(!this.enabled){
			this.enabled = true;
		}
		
		this.pos.start = {
			x: e.touches[0].clientX,
			y: e.touches[0].clientY
		};
					
	};
	
	Touch.move = function(e) {
		
		if(this.pos.start === null)return;
			
		this.pos.move = {
			x: e.touches[0].clientX,
			y: e.touches[0].clientY
		};
		
		this.dir.x = 0;
		this.dir.y = 0;
		
		var difX = this.pos.move.x - this.pos.start.x;
		var difY = this.pos.move.y - this.pos.start.y;
		
		if((difX < this.threshold && difX > -this.threshold) && (difY < this.threshold && difY > -this.threshold)) return;
				
		angle = Math.atan2(-1, 0) - Math.atan2(difY, difX);
		angle = -angle * 360 / (2*Math.PI);
		angle = (angle < 0) ? angle + 360: angle;
		
		if(angle < 22.5 || angle >= 337.5){
			this.dir.y = -1;
		} else if (angle < 67.5 && angle >= 22.5) {
			this.dir.x = 1;
			this.dir.y = -1;
		} else if (angle < 112.5 && angle >= 67.5) {
			this.dir.x = 1;
		} else if (angle < 157.5 && angle >= 112.5) {
			this.dir.x = 1;
			this.dir.y = 1;
		} else if (angle < 202.5 && angle >= 157.5) {
			this.dir.y = 1;
		} else if (angle < 247.5 && angle >= 202.5) {
			this.dir.x = -1;
			this.dir.y = 1;
		} else if (angle < 292.5 && angle >= 247.5) {
			this.dir.x = -1;
		} else if (angle < 337.5 && angle >= 292.5) {
			this.dir.x = -1;
			this.dir.y = -1;
		}
		
	};
	   
	Touch.end = function(e){
	
		if(this.pos.start !== null && this.pos.move === null){
			console.log('click');
		}
		
		this.pos.start = null;
		this.pos.move = null;
		
		this.dir = {
			x: 0,
			y: 0
		};
		
	};
	
	Touch.render = function () {
	
		if(this.pos.start !== null){
			EXP.engine.ctx.beginPath();
			EXP.engine.ctx.arc(this.pos.start.x, this.pos.start.y, 40, 0, 2 * Math.PI, false);
			EXP.engine.ctx.lineWidth = 2;
			EXP.engine.ctx.strokeStyle = 'white';
			EXP.engine.ctx.stroke();
		}
		
		if(this.pos.move !== null){
			EXP.engine.ctx.beginPath();
			EXP.engine.ctx.arc(this.pos.move.x, this.pos.move.y, 20, 0, 2 * Math.PI, false);
			EXP.engine.ctx.fillStyle = 'rgba(255,255,255,0.5)';
			EXP.engine.ctx.fill();
		}
		
	};
	   
	Touch.addClickListener = function(coord, dim, callback){};
	
	
	window.addEventListener("touchstart", Touch.start.bind(Touch), false);
	window.addEventListener("touchmove", Touch.move.bind(Touch), false);
	window.addEventListener("touchend", Touch.end.bind(Touch), false);
	
	return Touch;

});