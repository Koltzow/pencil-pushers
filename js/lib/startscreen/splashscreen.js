define(function () {
	
	var Splashscreen = {
		active: true,
		initiated: false,
		backgroundImage: new Image(),
		logo: new Image(),
		logoRed: new Image(),
		logoBlue: new Image(),
		pressStart: new Image(),
		stars: []
	};
	
	Splashscreen.backgroundImage.src = 'images/splashscreen.png';
	Splashscreen.logo.src = 'images/logo.png';
	Splashscreen.logoRed.src = 'images/logo_red.png';
	Splashscreen.logoBlue.src = 'images/logo_blue.png';
	Splashscreen.pressStart.src = 'images/pressstart.png';
	
	var offset = 0;
	
	Splashscreen.update = function () {
	
		if(!this.initiated){
			this.initiated = true;
			
			//EXP.sound.play('boss');
			
			for (var i = 0; i < 100; i++) {
				Splashscreen.stars.push({
					x: Math.random()*EXP.engine.width,
					y: Math.random()*EXP.engine.height,
					s: Math.random()*3+1,
					w: Math.ceil(Math.random()*2),
					l: Math.random()*100
				});
			}
		}
		
		if(
			(EXP.controller.controllers.length > 0 && 
			EXP.controller.controllers[0].connected === true &&
			EXP.controller.controllers[0].buttons[0].click) ||
			EXP.controller.keyboard.isPressed('x')
		){
			EXP.startscreen.gotoSelectplayer();
			EXP.sound.play('menu');
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
		
		offset+= 0.05;
		
	};
	
	Splashscreen.render = function () {
	
		EXP.engine.ctx.drawImage(this.backgroundImage, 0, 0, EXP.engine.width, EXP.engine.height);
		
		for (var i = 0; i < this.stars.length; i++) {
			EXP.engine.ctx.fillStyle = '#F5C900';
			if(this.stars[i].l > 0)EXP.engine.ctx.fillRect(Math.round(this.stars[i].x), Math.round(this.stars[i].y), this.stars[i].w, this.stars[i].w);
		}
		
		EXP.engine.ctx.drawImage(this.logoRed, EXP.engine.width/2-350/2 + Math.round(Math.sin(offset-1)), 90 + Math.round(Math.sin(offset+1)*2), 350, 130);
		EXP.engine.ctx.drawImage(this.logoBlue, EXP.engine.width/2-350/2 + Math.round(Math.sin(offset-1)*2), 90 + Math.round(Math.sin(offset-1)*5), 350, 130);
		EXP.engine.ctx.drawImage(this.logo, EXP.engine.width/2-350/2, 90 + Math.round(Math.sin(offset)*5), 350, 130);
		if(Math.round(Math.sin(offset))) EXP.engine.ctx.drawImage(this.pressStart, EXP.engine.width/2-100, 260, 200, 20);
	
	};
	
	Splashscreen.reset = function () {};
	
	return Splashscreen;
	
});