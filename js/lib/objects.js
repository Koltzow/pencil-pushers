define([
	'lib/objects/health',
	'lib/objects/portal',
	'lib/objects/trap'
], function (Health, Portal, Trap) {

	var Objects = {
	    
	    health: Health,
	    portal: Portal,
	    trap: Trap
	
	};
		
	return Objects;
    
});