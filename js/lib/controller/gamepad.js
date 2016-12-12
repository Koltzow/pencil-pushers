define(function () {

	var GamePad = {
		supported: "getGamepads" in navigator,
		controllers: [
			{
				connected: false,
				ready: false,
				player: null,
				character: 0,
				buttons: [],
				sticks: [],
				stick: {},
				dir: {
		    		x: 0,
		    		y: 0
		    	}
		    },
		    {
		    	connected: false,
		    	ready: false,
		    	player: null,
		    	character: 1,
		    	buttons: [],
		    	sticks: [],
		    	stick: {},
		    	dir: {
		    		x: 0,
		    		y: 0
		    	}
		    },
		    {
		    	connected: false,
		    	ready: false,
		    	player: null,
		    	character: 2,
		    	buttons: [],
		    	sticks: [],
		    	stick: {},
		    	dir: {
		    		x: 0,
		    		y: 0
		    	}
		    },
		    {
		    	connected: false,
		    	ready: false,
		    	player: null,
		    	character: 3,
		    	buttons: [],
		    	sticks: [],
		    	stick: {},
		    	dir: {
		    		x: 0,
		    		y: 0
		    	}
		    }
		]
	};
	
	GamePad.update = function () {
		
		if(navigator.getGamepads().length > 0){
		
			for (var i = 0; i < navigator.getGamepads().length; i++) {
			
				if(navigator.getGamepads()[i] !== undefined) {
				
					if(!this.controllers[i].connected){
						console.log('GAMEPAD '+(i+1)+': Connected');
						this.controllers[i].player = new EXP.player(EXP.data.characters[this.controllers[i].character]);
					}
					
				    this.controllers[i].connected = true;
				    
				    if(navigator.getGamepads()[i].buttons !== undefined){
				    
					    for (var j = 0; j < navigator.getGamepads()[i].buttons.length; j++) {
					    
					    	if(this.controllers[i].buttons[j] !== undefined){
					    					    					    					    	
					    		if(
					    			!this.controllers[i].buttons[j].pressed &&
					    			navigator.getGamepads()[i].buttons[j].pressed 
					    		){
					    			this.controllers[i].buttons[j].click = true;
					    			if(EXP.debug.gamepad) console.log('C: '+(i+1)+' click: '+j);
					    		} else {
					    			this.controllers[i].buttons[j].click = false;
					    		}
					    		
					    		this.controllers[i].buttons[j].pressed = navigator.getGamepads()[i].buttons[j].pressed;
					    		this.controllers[i].buttons[j].value = navigator.getGamepads()[i].buttons[j].value;
					    		
					    		
					    	} else {
					    					    	
					    		this.controllers[i].buttons[j] = {};
					    		this.controllers[i].buttons[j].pressed = navigator.getGamepads()[i].buttons[j].pressed;
					    		this.controllers[i].buttons[j].value = navigator.getGamepads()[i].buttons[j].value;
					    		this.controllers[i].buttons[j].click = false;
					    		
					    	}
					    	
					    }
				    
				    }
				    
				    this.controllers[i].stick['left'] = false;
				    this.controllers[i].stick['right'] = false;
				    this.controllers[i].stick['down'] = false;
				    this.controllers[i].stick['up'] = false;
				    
				    for (var k = 0; k < navigator.getGamepads()[i].axes.length; k++) {
				    	
				    	if(k < 2){
				    		
				    		if(!Math.round(this.controllers[i].sticks[k]) && Math.round(navigator.getGamepads()[i].axes[k]) !== 0){
				    							    							    			
				    			if(k === 0 && Math.round(navigator.getGamepads()[i].axes[k]) === -1){
				    				if(EXP.debug.gamepad) console.log('C: '+(i+1)+' stick left');
				    				this.controllers[i].stick['left'] = true;
				    			} else if(k === 0 && Math.round(navigator.getGamepads()[i].axes[k]) === 1){
				    				if(EXP.debug.gamepad) console.log('C: '+(i+1)+' stick right');
				    				this.controllers[i].stick['right'] = true;
				    			} else if(k === 1 && Math.round(navigator.getGamepads()[i].axes[k]) === -1){
				    				if(EXP.debug.gamepad) console.log('C: '+(i+1)+' stick up');
				    				this.controllers[i].stick['up'] = true;
				    			} else if (k === 1 && Math.round(navigator.getGamepads()[i].axes[k]) === 1) {
				    				if(EXP.debug.gamepad) console.log('C: '+(i+1)+' stick down');
				    				this.controllers[i].stick['down'] = true;
				    			}
				    			
				    		}
				    		
				    	}
				    	
				    	this.controllers[i].sticks[k] = navigator.getGamepads()[i].axes[k];
				    					    	
				    }
				    
				    if(this.controllers[i].buttons[0] !== undefined){
				    	
				    	this.controllers[i].sticks = navigator.getGamepads()[i].axes;
				    	
				    }
				    
				    
				    
				    this.controllers[i].dir.x = 0;
				    
				    if(this.controllers[i].sticks.length > 0) {
						this.controllers[i].dir.x = Math.round(this.controllers[i].sticks[0]*3);
				    	this.controllers[i].dir.y = Math.round(this.controllers[i].sticks[1]*3);
				    }
				    
				    if(this.controllers[i].buttons[9].click) {
				    	EXP.engine.pause();
				    }
				    
				} else {
				
					if(this.controllers[i].connected){
						console.log('GAMEPAD '+(i+1)+': Disconnected');
						EXP.engine.players--;
						this.controllers[i].player = null;
						
						for (var j = 0; j < EXP.engine.bodies.length; j++) {
							if(EXP.engine.bodies[j].type === 'player' && EXP.engine.bodies[j].id === (i+1)){
								EXP.engine.bodies.splice(j, 1);
							}
						}
					}
					
					
					
					this.controllers[i].connected = false;
					this.controllers[i].buttons = [];
					this.controllers[i].sticks = [];
					
				}
				
			}
		
		}
	
	};
	
	return GamePad;
	
});
