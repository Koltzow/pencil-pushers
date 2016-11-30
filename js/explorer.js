'use strict';

var EXP = {};

require([
	'lib/data',
	'lib/boss',
	'lib/ammo',
	'lib/sound',
	'lib/effects',
	'lib/util',
	'lib/ui',
	'lib/physics',
	'lib/objects',
	'lib/items',
	'lib/room',
	'lib/camera',
	'lib/engine',
	'lib/player',
	'lib/controller',
	'lib/debug',
	'lib/startscreen'
], function(Data, Boss, Ammo, Sound, Effects, Util, Ui, Physics, Objects, Items, Room, Camera, Engine, Player, Controller, Debug, Startscreen) {

	EXP = {
		data: Data,
		ammo: Ammo,
		boss: Boss,
		sound: Sound,
		room: Room,
		player: Player,
		engine: Engine,
		camera: Camera,
		controller: Controller,
		objects: Objects,
		items: Items,
		effects: Effects,
		util: Util,
		ui: Ui,
		physics: Physics,
		debug: Debug,
		startscreen: Startscreen
	};	
	
	EXP.engine.create();
	EXP.engine.run();
    
});