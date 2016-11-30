define(function () {

	var Debug = {
	    
	    colliders: false,
	    gamepad: false
	
	};
	
	Debug.showColliders = function () {
		this.colliders = true;
	};
	
	Debug.hideColliders = function () {
		this.colliders = false;
	};
	
	Debug.showGamepadInput = function () {
		this.gamepad = true;
	};
	
	Debug.hideGamepadInput = function () {
		this.gamepad = false;
	};
		
	return Debug;
    
});