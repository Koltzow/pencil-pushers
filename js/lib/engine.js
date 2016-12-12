define(function () {

	var Engine = {};
	
	Engine.create = function(seed, params) {
	
		var _this = this;
	
		params = params || {};
		this.seed = seed || '1';
		
		document.body.style.backgroundColor = '#000';
		
		this.container = document.createElement('div');
		this.container.id = 'canvas-container';
		this.container.style.height = window.innerHeight+'px';
		this.container.style.width = window.innerWidth+'px';
		this.container.style.display = 'table';
		
		var containerInner = document.createElement('div');
		containerInner.id = 'cavnas-container-inner';
		containerInner.style.display = 'table-cell';
		containerInner.style.verticalAlign = 'middle';
		
		this.container.appendChild(containerInner);
		document.body.appendChild(this.container);
	
		this.mainloop = null;
		
		//constants
		this.TILESIZE = 32;
		
		this.bodies = [];
		this.players = 0;
		this.maxPlayers = 2;
		this.stopped = true;
		this.paused = false;
		this.fullscreen = params.fullscreen || true;
		this.width = 640;
		this.height = 360;
		this.backgroundColor = params.backgroundColor || '#000';
		this.fps = params.fps || 60;
		this.camera = params.camera || {x:0, y:0};
			
		this.canvas = document.createElement('canvas');
		this.canvas.style.margin = '0 auto';
		this.canvas.width = this.width;
		this.canvas.height = this.height;
	
		var cW, cH;
		
		if(this.fullscreen) {
			if(this.width/this.height < window.innerWidth/window.innerHeight){
				cW = this.width/this.height*window.innerHeight;
				cH = window.innerHeight;
			} else {
				cW = window.innerWidth;
				cH = this.height/this.width*window.innerWidth;
			}
		} else {
			cW = this.width;
			cH = this.height;
		}
		
		this.canvas.style.width = cW+'px';
		this.canvas.style.height = cH+'px';
		containerInner.appendChild(this.canvas);
		
		this.ctx = this.canvas.getContext('2d');
		this.ctx.imageSmoothingEnabled = false;
		this.ctx.mozImageSmoothingEnabled = false;
		this.ctx.oImageSmoothingEnabled = false;
		this.ctx.msImageSmoothingEnabled = false; 
		
		// shim layer with setTimeout fallback
		window.requestAnimFrame = (function(){
		  return  window.requestAnimationFrame       ||
		          window.webkitRequestAnimationFrame ||
		          window.mozRequestAnimationFrame    ||
		          function( callback ){
		            window.setTimeout(callback, 1000/_this.fps);
		          };
		})();
		
		this.now = Date.now();
		this.then = Date.now();
		this.interval = 1000/this.fps;
		this.delta = 0;
		
		//eventlisteners
		window.addEventListener('resize', this.resize.bind(this));
		
		EXP.controller.keyboard.addKeyPressListener('Escape', function () {
			if(_this.stopped){
				_this.run();
			} else {
				_this.stop();
			}
		});
					
	};
	
	Engine.clear = function () {
		
		this.ctx.clearRect(0, 0, this.width, this.height);
		
	};
	
	Engine.update = function () {
	
		EXP.controller.update();
	
		if(EXP.startscreen !== undefined && EXP.startscreen.active){
			EXP.startscreen.update();
			return;
		}
		
		if(EXP.engine.paused && EXP.menu !== undefined){
			EXP.menu.update();
			return;
		}
		
		this.bodies.sort(function (a, b) {
			if(a.collider === undefined)console.log(a);
			return a.y + a.collider.top + a.collider.height > b.y + b.collider.top + b.collider.height;
		});
		
		for (var i = 0; i < this.bodies.length; i++) {
			this.bodies[i].update();
		}
		
		EXP.effects.update();
		EXP.ui.update();
		
		if(EXP.camera.target !== undefined) EXP.camera.update();
						
	};
	
	Engine.render = function () {
	
		this.clear();
		
		if(EXP.startscreen !== undefined && EXP.startscreen.active){
			EXP.startscreen.render();
			return;
		}
		
		if(EXP.engine.paused && EXP.menu !== undefined){
			EXP.menu.render();
			return;
		}
		
		EXP.room.render();
				
		for (var i = 0; i < this.bodies.length; i++) {
			this.bodies[i].render();
		}
		
		EXP.effects.render();
		EXP.ui.render();	
		
	};
	
	Engine.add = function (body) {
	
		this.bodies.push(body);
	
	};
	
	Engine.remove = function (body) {
		
		for (var i = 0; i < this.bodies.length; i++) {
			if(this.bodies[i].id === body.id){
				this.bodies.splice(i, 1);
			}
		}
	
	};
	
	Engine.resize = function () {
	
		var cW, cH;
		
		this.container.style.height = window.innerHeight+'px';
		this.container.style.width = window.innerWidth+'px';
		
		if(this.fullscreen) {
			if(this.width/this.height < window.innerWidth/window.innerHeight){
				cW = this.width/this.height*window.innerHeight;
				cH = window.innerHeight;
			} else {
				cW = window.innerWidth;
				cH = this.height/this.width*window.innerWidth;
			}
		} else {
			cW = this.width;
			cH = this.height;
		}
		
		this.canvas.style.width = cW+'px';
		this.canvas.style.height = cH+'px';
		
		this.render();
			
	};
	
	Engine.loop = function () {
	
		this.mainloop = requestAnimFrame(this.loop.bind(this));
		     
		this.now = Date.now();
		this.delta = this.now - this.then;
		     
		if (this.delta > this.interval) {
		        
			this.then = this.now - (this.delta % this.interval);
		    if(!this.stopped)this.update();
		    if(!this.stopped)this.render();
		
		}
	
	};
	
	Engine.run = function () {
	
		console.log('ENGINE: Run');
		
		if(this.stopped){
		
			EXP.sound.playAll();
		
			this.loop();
			this.stopped = false;
		
		}
	
	};
	
	Engine.pause = function () {
	
		console.log('pause');
		this.paused = !this.paused;
	};
	
	Engine.stop = function () {
	
		if(!this.stopped){
		
			console.log('ENGINE: Stop');
			
			EXP.sound.play('menu');
			
			setTimeout(function () {
				EXP.sound.pauseAll();
			}, 500);
	
			window.cancelAnimationFrame(this.mainloop);
			
			this.render();
			this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
			this.ctx.fillRect(0, 0, this.width, this.height);
			
			this.stopped = true;
		
		}
	
	};
	
	return Engine;
	
});