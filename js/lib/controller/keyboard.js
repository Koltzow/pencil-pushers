define(function () {

	var Keyboard = {
	    
	    pressedKeys: [],
	    dir: {
	    	x: 0,
	    	y: 0
	    }
	
	};
	
	Keyboard.keydown = function(e) {
		this.pressedKeys[e.key] = true;
		this.pressedKeys[e.code] = true;
		this.pressedKeys[e.keyCode] = true;
		
		this.dir.x = 0;
		this.dir.y = 0;
		
		if(this.isPressed('w') || this.isPressed('W') || this.isPressed('ArrowUp')){ this.dir.y -= 1; } 
		if(this.isPressed('s') || this.isPressed('S') || this.isPressed('ArrowDown')){ this.dir.y += 1; }
		if(this.isPressed('a') || this.isPressed('A') || this.isPressed('ArrowLeft')){ this.dir.x -= 1; }
		if(this.isPressed('d') || this.isPressed('D') || this.isPressed('ArrowRight')){ this.dir.x += 1; }
	};
	
	Keyboard.keyup = function(e) {
		this.pressedKeys[e.key] = false;
		this.pressedKeys[e.code] = false;
		this.pressedKeys[e.keyCode] = false;
		
		this.dir.x = 0;
		this.dir.y = 0;
		
		if(this.isPressed('w') || this.isPressed('W') || this.isPressed('ArrowUp')){ this.dir.y -= 1; } 
		if(this.isPressed('s') || this.isPressed('S') || this.isPressed('ArrowDown')){ this.dir.y += 1; }
		if(this.isPressed('a') || this.isPressed('A') || this.isPressed('ArrowLeft')){ this.dir.x -= 1; }
		if(this.isPressed('d') || this.isPressed('D') || this.isPressed('ArrowRight')){ this.dir.x += 1; }
	};
	   
	Keyboard.isPressed = function(key){
		return this.pressedKeys[key] ? true : false;
	};
	   
	Keyboard.addKeyPressListener = function(keyCode, callback){
	      
		document.addEventListener('keydown', function(e) {
			if (e.keyCode === keyCode || e.key === keyCode){
				callback(e);
			}
		});
	   
	};
	
	document.addEventListener("keydown", Keyboard.keydown.bind(Keyboard));
	document.addEventListener("keyup", Keyboard.keyup.bind(Keyboard));
	
	return Keyboard;
	
});