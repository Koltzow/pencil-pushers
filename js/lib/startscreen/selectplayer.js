define(function () {
	
	var Selectplayer = {
		active: false,
		initiated: false,
		stars: [],
		colors: ['#43ffa3', '#f526af', '#23b1ff', '#ff961a'],
		backgroundImage: new Image(),
		characterThumbnail: new Image(),
		characterBig: new Image(),
		freeSlot: new Image(),
		indicatorImage: new Image(),
		counter: 0,
		delay: 0,
		currentAnimationFrame: 0,
		animation: {x: 0, y: 0, f: 6, s: 4}
	};
	
	Selectplayer.backgroundImage.src = 'images/splashscreen2.png';
	Selectplayer.freeSlot.src = 'images/freeslot.png';
	Selectplayer.characterThumbnail.src = 'images/tilesheets/player/characters-thumbnail.png';
	Selectplayer.characterBig.src = 'images/tilesheets/player/characters-big.png';
	Selectplayer.indicatorImage.src = 'images/tilesheets/player/indicator-animated.png';
	
	Selectplayer.update = function () {
	
		this.currentAnimationFrame += 1/this.animation.s;
		
		if(this.currentAnimationFrame >= this.animation.f){
			this.currentAnimationFrame = 0;
		}
		
	
		if(!this.initiated){
			this.initiated = true;
			
//			for (var i = 0; i < 100; i++) {
//				this.stars.push({
//					x: Math.random()*EXP.engine.width,
//					y: Math.random()*EXP.engine.height,
//					s: Math.random()*3+1,
//					w: Math.ceil(Math.random()*2),
//					l: Math.random()*100
//				});
//			}
		}
		
		for (var i = 0; i < EXP.controller.controllers.length; i++) {
		
			if(!EXP.controller.controllers[i].connected) {
				continue;
			}
			
			if(EXP.controller.controllers[i].buttons[0].click && EXP.controller.controllers[i].ready){
			
				var allReady = true;
			
				for (var j = 0; j < EXP.controller.controllers.length; j++) {
					if(EXP.controller.controllers[j].connected && !EXP.controller.controllers[j].ready) allReady = false;
				}
				
				if(allReady){
					EXP.startscreen.active = false;
					EXP.room.generate();
				}
			}
			
			if(EXP.controller.controllers[i].buttons[0].click && !EXP.controller.controllers[i].ready){
				EXP.controller.controllers[i].ready = true;
				EXP.sound.play('menu');
			}
			
			if(EXP.controller.controllers[i].buttons[1].click && EXP.controller.controllers[i].ready){
				EXP.controller.controllers[i].ready = false;
				EXP.sound.play('hit');
			}
			
			if(EXP.controller.controllers[i].ready) continue;
			
		
			if(EXP.controller.controllers[i].stick['left'] || (EXP.controller.controllers[i].buttons[14] !== undefined && EXP.controller.controllers[i].buttons[14].click)){
				EXP.controller.controllers[i].character--;
			}
			
			if(EXP.controller.controllers[i].stick['right'] || (EXP.controller.controllers[i].buttons[15] !== undefined && EXP.controller.controllers[i].buttons[15].click)){
				EXP.controller.controllers[i].character++;
			}
						
			EXP.controller.controllers[i].character = (EXP.controller.controllers[i].character > EXP.data.characters.length - 1)? 0 : EXP.controller.controllers[i].character;
			EXP.controller.controllers[i].character = (EXP.controller.controllers[i].character < 0)? EXP.data.characters.length - 1 : EXP.controller.controllers[i].character;
			
		}
		
		for (var i = 0; i < this.stars.length; i++) {
			this.stars[i].x += this.stars[i].s/2;
			this.stars[i].y -= this.stars[i].s;
			this.stars[i].l--;
			
			if(this.stars[i].x > EXP.engine.width) {
				this.stars[i].x = 0;
				this.stars[i].l = Math.random()*100;
			}
			if(this.stars[i].y < 0) {
				this.stars[i].y = EXP.engine.height;
				this.stars[i].l = Math.random()*100;
			}
		}
		
		this.delay++;
		
		if(this.delay > 6){
			this.counter++;
			if(this.counter > 3) this.counter = 0;
			this.delay = 0;
		}
		
	};
	
	Selectplayer.render = function () {
	
		//EXP.engine.ctx.drawImage(this.backgroundImage, 0, 0, EXP.engine.width, EXP.engine.height);
		
		EXP.engine.ctx.drawImage(
			this.backgroundImage,
			(this.animation.x+Math.floor(this.currentAnimationFrame))*EXP.engine.width, 
			0,
			EXP.engine.width,
			EXP.engine.height,
			0,
			0,
			EXP.engine.width,
			EXP.engine.height
		);
		
		for (var i = 0; i < this.stars.length; i++) {
			EXP.engine.ctx.fillStyle = '#F5C900';
			if(this.stars[i].l > 0)EXP.engine.ctx.fillRect(Math.round(this.stars[i].x), Math.round(this.stars[i].y), this.stars[i].w, this.stars[i].w);
		}
		
		for (var i = 0; i < EXP.controller.controllers.length; i++) {
			
			
			EXP.engine.ctx.fillStyle = (EXP.controller.controllers[i].ready) ? '#FCCCB0' : '#260562';
			EXP.engine.ctx.fillRect(
				130*i + 69,
				64,
				112,
				182
			);
			
			EXP.engine.ctx.fillStyle = this.colors[i];
			EXP.engine.ctx.fillRect(
				130*i + 65 + 5,
				65,
				110,
				180
			);
			
			if(EXP.controller.controllers[i].connected){
				EXP.engine.ctx.drawImage(
					this.characterBig,
					100*EXP.controller.controllers[i].character,
					0,
					100,
					170,
					130*i + 65 + 10,
					70,
					100,
					170
				);
				
				EXP.engine.ctx.fillStyle = this.colors[i];
				EXP.engine.ctx.drawImage(
					this.indicatorImage,
					12*this.counter,
					7*i,
					12,
					7,
					12*i+58*EXP.controller.controllers[i].character + EXP.engine.width/2 - EXP.data.characters.length*48/2 - (EXP.data.characters.length-1)*10/2,
					270,
					12,
					7
				);
				
			} else {
				EXP.engine.ctx.drawImage(
					this.freeSlot,
					130*i + 65 + 10,
					70,
					100,
					170
				);
			}
			
			
			
		}
		
		for (var j = 0; j < EXP.data.characters.length; j++) {
			
			EXP.engine.ctx.drawImage(
				this.characterThumbnail,
				48*j,
				0,
				48,
				48,
				58*j + EXP.engine.width/2 - EXP.data.characters.length*48/2 - (EXP.data.characters.length-1)*10/2,
				280,
				48,
				48
			);
			
		}
	
	};
	
	Selectplayer.reset = function () {
		
		for (var i = 0; i < EXP.controller.controllers.length; i++) {
			EXP.controller.controllers[i].character = i;
		}
		
	};
	
	return Selectplayer;
	
});