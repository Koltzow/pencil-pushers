define(function () {

	var ShieldBar = {
		percent: 1,
		target: 1,
		x: 20,
		y: 24+16,
		icon: new Image()
	};
		
	ShieldBar.icon.src = 'images/tilesheets/ui/ui.png';
	
	ShieldBar.update = function () {
	
		this.percent += (this.target - this.percent) * 0.1;
		
	};
	
	ShieldBar.render = function () {
	
		EXP.engine.ctx.drawImage(this.icon, 0, 24, 24, 24, this.x, this.y, 24, 24);
		
		EXP.engine.ctx.fillStyle = 'rgba(0,0,0,0.5)';
		EXP.engine.ctx.fillRect(this.x+20, this.y + 4, 103, 16);
		
		EXP.engine.ctx.fillStyle = 'rgba(255,255,255,0.3)';
		EXP.engine.ctx.fillRect(this.x+20, this.y + 8, 100, 8);
			
		EXP.engine.ctx.fillStyle = '#ff46bb';
		EXP.engine.ctx.fillRect(this.x + 20, this.y + 8, Math.floor(this.percent * 100), 8);
			
	
	};
	
	return ShieldBar;
	
});