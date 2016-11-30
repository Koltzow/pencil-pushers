define([
	'lib/startscreen/splashscreen',
	'lib/startscreen/selectplayer',
	'lib/startscreen/selectboss'
], function (Splashscreen, Selectplayer, Selectboss) {
	
	var Startscreen = {
		active: true,
		splashscreen: Splashscreen,
		selectplayer: Selectplayer,
		selectboss: Selectboss
	};
	
	Startscreen.update = function () {
		
		if(this.splashscreen.active){
			this.splashscreen.update();
			return;
		}
		
		if(this.selectplayer.active){
			this.selectplayer.update();
			return;
		}
		
		if(this.selectboss.active){
			this.selectboss.update();
			return;
		}
		
	};
	
	Startscreen.render = function () {
	
		if(this.splashscreen.active){
			this.splashscreen.render();
			return;
		}
		
		if(this.selectplayer.active){
			this.selectplayer.render();
			return;
		}
		
		if(this.selectboss.active){
			this.selectboss.render();
			return;
		}
	
	};
	
	Startscreen.gotoSplashscreen = function () {
	
		this.splashscreen.reset();
		this.active = true;
		this.splashscreen.active = true;
		this.selectplayer.active = false;
		this.selectboss.active = false;
	
	};
	
	Startscreen.gotoSelectplayer = function () {
	
		this.selectplayer.reset();
		this.active = true;
		this.splashscreen.active = false;
		this.selectplayer.active = true;
		this.selectboss.active = false; 
	
	};
	
	Startscreen.gotoSelectboss = function () {
	
		this.selectplayer.reset();
		this.active = true;
		this.splashscreen.active = false;
		this.selectplayer.active = false;
		this.selectboss.active = true; 
	
	};
	
	return Startscreen;
	
});