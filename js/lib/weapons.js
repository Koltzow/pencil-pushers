define([
	'lib/weapons/stapler',
	'lib/weapons/pistol'
],function (Stapler, Pistol) {

	var Weapons = {
		stapler: Stapler,
		pistol: Pistol
	};
	
	return Weapons;
	
});