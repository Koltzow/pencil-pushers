define([
	'lib/ammo/staple',
	'lib/ammo/energyball',
	'lib/ammo/bullet',
	'lib/ammo/bigbullet',
	'lib/ammo/bouncelazer'
],function (Staple, Energyball, Bullet, Bigbullet, Bouncelazer) {

	var Ammo = {
		staple: Staple,
		energyball: Energyball,
		bullet: Bullet,
		bigbullet: Bigbullet,
		bouncelazer: Bouncelazer
	};
	
	return Ammo;
	
});