define([
	'lib/ui/healthbar',
	'lib/ui/bossbar',
	'lib/ui/shieldbar',
	'lib/ui/jetfuelbar',
	'lib/ui/inventorybar'
], function (Healthbar, BossBar, Shieldbar, Jetfuelbar, Inventorybar) {

	var Ui = {
	    
	    healthbar: Healthbar,
	    bossbar: BossBar,
	    shieldbar: Shieldbar,
	    jetfuelbar: Jetfuelbar,
	    inventorybar: Inventorybar
	
	};
	
	Ui.update = function () {
	
		//this.shieldbar.update();
		this.healthbar.update();
		//this.jetfuelbar.update();
		//this.inventorybar.update();
	
	};
		
	Ui.render = function () {
		
		//this.shieldbar.render();
		this.healthbar.render();
		//this.jetfuelbar.render();
		//this.inventorybar.render();
		
	};	
	
	return Ui;
    
});