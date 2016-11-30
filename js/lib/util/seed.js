define(function () {

	var Seed = {};
		
	Seed.create = function () {
	
		var seed = Math.random().toString(36).substring(7);	
		return seed;
		
	};
	
	return Seed;

});