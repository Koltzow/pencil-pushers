define(function () {

	var Sound = {
		sounds: [],
		soundsPlaying: []
	};
	
	Sound.play = function (id, params) {
	
		var _this = this;
	
		var params = params || {};
		var sound = null;
	
		for (var i = 0; i < this.sounds.length; i++) {
			
			if(this.sounds[i].id === id){
				sound = this.sounds[i];
				continue;
			}
			
		}
		
		if(sound !== null && sound.loaded){
		
			var audio = new Audio();
			
			audio.volume = params.volume || 1;
			var loopLimit = params.loop || 0;
			var loopCounter = 0;
			
			if(loopLimit === -1){
				
				audio.loop = true;
				
			} else if (loopLimit > 1) {
				
				audio.addEventListener('ended', function(){
					_this.remove(sound.id);
				    if (loopCounter < loopLimit-1){
				        this.currentTime = 0;
				        this.play();
				        _this.soundsPlaying.push({
				        	id: sound.id,
				        	audio: this
				        });
				        loopCounter++;
				    }
				}, false);  
				
			} else {
				
				audio.addEventListener('ended', function(){
					_this.remove(sound.id);
				}, false);
				
			}
			
			audio.src = sound.src;
			audio.play();
			this.soundsPlaying.push({
				id: sound.id,
				audio: audio
			});
			
			
		}
	
	};
	
	Sound.pauseAll = function () {
		
		for (var i = 0; i < this.soundsPlaying.length; i++){
			this.soundsPlaying[i].audio.pause();
		}
		
	};
	
	Sound.playAll = function () {
		
		for (var i = 0; i < this.soundsPlaying.length; i++){
			this.soundsPlaying[i].audio.play();
		}
		
	};
	
	Sound.stop = function (id) {
		for (var i = 0; i < this.soundsPlaying.length; i++){
		    if (this.soundsPlaying[i].id === id) { 
		        this.soundsPlaying[i].audio.pause();
		        this.soundsPlaying.splice(i, 1);
		        break;
		    }
		}
	};
	
	Sound.remove = function (id) {
		
		for (var i = 0; i < this.soundsPlaying.length; i++){
		    if (this.soundsPlaying[i].id === id) { 
		        this.soundsPlaying.splice(i, 1);
		        break;
		    }
		}
		
	};
	
	Sound.load = function (manifest) {
	
		var _this = this;
	
		for (var i = 0; i < manifest.length; i++) {
			
			var sound = manifest[i];
			
			if(sound.id !== undefined && sound.src !== undefined){
			
				(function () {
				
					var newSound = {
						id: sound.id,
						src: sound.src,
						loaded: false
					};
					
					_this.sounds.push(newSound);
				
					var audio = new Audio();
					audio.addEventListener('canplaythrough', function () {
						newSound.loaded = true;
					}, false);
					audio.src = sound.src;
					
				})();
				
			}
			
		}
	
	};
	
	var manifest = [
		{id:'weapon-pistol-fire', src:'sounds/weapons/pistol-fire.wav'},
		{id:'weapon-stapler-fire',	src:'sounds/weapons/stapler-fire.mp3'},
		{id:'main', 	src:'sounds/main.mp3'},
		{id:'select', 	src:'sounds/select.wav'},
		{id:'footsteps',src:'sounds/steps.mp3'},
		{id:'boss',		src:'sounds/boss.mp3'},
		{id:'hit',		src:'sounds/hit.wav'},
		{id:'portal', 	src:'sounds/portal.ogg'},
		{id:'health', 	src:'sounds/health.wav'},
		{id:'death', 	src:'sounds/death.wav'},
		{id:'menu', 	src:'sounds/menu.ogg'},
		{id:'jpstart',	src:'sounds/jpstart.ogg'},
		{id:'jpland',	src:'sounds/jpland.ogg'},
		{id:'jpempty', 	src:'sounds/jpempty.mp3'},
		{id:'jpboost',	src:'sounds/jpboost.wav'}
	];
	
	Sound.load(manifest);
	
	return Sound;

});