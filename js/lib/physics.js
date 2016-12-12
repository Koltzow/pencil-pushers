define([
	'lib/physics/collision',
	'lib/physics/collider'
], function (Collision, Collider) {

	var Physics = {
	    
	    collision: Collision,
	    collider: Collider
	
	};
		
	return Physics;
    
});