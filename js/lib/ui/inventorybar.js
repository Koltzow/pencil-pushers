define(function () {

	var InventoryBar = {
		limit: 6,
		inventory: [],
		targetInventory: [],
		y: 360-32,
		frame: new Image()
	}
	
	InventoryBar.frame.src = 'images/tilesheets/ui/frame.png';
	
	InventoryBar.update = function () {
	
		this.inventory = this.targetInventory;
		
	};
	
	InventoryBar.render = function () {
	
		EXP.engine.ctx.fillStyle = 'red';
	
		for (var i = 0; i < this.limit; i++) {
				
			EXP.engine.ctx.drawImage(
				this.frame,
				EXP.engine.width/2 - this.limit/2*EXP.engine.TILESIZE + i*EXP.engine.TILESIZE, 
				this.y, 
				EXP.engine.TILESIZE, EXP.engine.TILESIZE
			);
			
			if(this.inventory[i] === undefined) continue;
			
			EXP.engine.ctx.drawImage(
				this.inventory[i].tilesheet, 
				EXP.engine.TILESIZE	, 
				0, 
				EXP.engine.TILESIZE, 
				EXP.engine.TILESIZE, 
				EXP.engine.width/2 - this.limit/2*EXP.engine.TILESIZE + i*EXP.engine.TILESIZE, 
				this.y, 
				EXP.engine.TILESIZE, EXP.engine.TILESIZE
			);
			
		}
	
	};
	
	return InventoryBar;
	
});