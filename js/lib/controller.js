define([
	'lib/controller/keyboard',
	'lib/controller/touch',
	'lib/controller/gamepad'
], function (Keyboard, Touch, GamePad) {

	var Controller = {
	    
	    keyboard: Keyboard,
	    touch: Touch,
	    gamepad: GamePad,
	    controllers: []
	
	};
		
	Controller.update = function () {
	
		if(this.gamepad.supported){
			this.gamepad.update();
			this.controllers = this.gamepad.controllers;
		} else {
			this.controllers[0] = this.keyboard;
		}
	
	};
			
	return Controller;
    
});