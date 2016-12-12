'use strict';

var EXP = {};

require([
	'lib/data',
	'lib/sprite',
	'lib/weapons',
	'lib/bosses',
	'lib/ammo',
	'lib/sound',
	'lib/effects',
	'lib/util',
	'lib/ui',
	'lib/physics',
	'lib/objects',
	'lib/items',
	'lib/camera',
	'lib/engine',
	'lib/room',
	'lib/player',
	'lib/controller',
	'lib/debug',
	'lib/startscreen',
	'lib/menu',
], function(Data, Sprite, Weapons, Bosses, Ammo, Sound, Effects, Util, Ui, Physics, Objects, Items, Camera, Engine, Room, Player, Controller, Debug, Startscreen, Menu) {

	EXP = {
		data: Data,
		sprite: Sprite,
		weapons: Weapons,
		ammo: Ammo,
		bosses: Bosses,
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
		startscreen: Startscreen,
		menu: Menu
	};	
	
	EXP.engine.create();
	EXP.engine.run();
    
});