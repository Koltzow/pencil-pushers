define(function () {

	var BossBar = {};
	
	BossBar.create = function (id) {
	
		var bossbar = {
			percent: 1,
			target: 1,
			color: '#FF2424',
			x: EXP.engine.width/2-100,
			y: EXP.engine.height - 26,
			icon: new Image()
		};
		
		bossbar.icon.src = 'images/tilesheets/ui/ui.png';
			
		bossbar.update = function () {
			this.target = (this.target < 0)? 0 : this.target;
			this.percent += (this.target - this.percent) * 0.1;
		};
		
		bossbar.render = function () {
			
			EXP.engine.ctx.fillStyle = 'rgba(0,0,0,0.5)';
			EXP.engine.ctx.fillRect(this.x, this.y, 200, 16);
			
			EXP.engine.ctx.drawImage(this.icon, 0, 16*4, 16, 16, this.x, this.y, 16, 16);
			
			EXP.engine.ctx.fillStyle = 'rgba(255,255,255,0.3)';
			EXP.engine.ctx.fillRect(this.x+16, this.y + 4, 200-16-4, 8);
				
			EXP.engine.ctx.fillStyle = this.color;
			EXP.engine.ctx.fillRect(this.x+16, this.y + 4, Math.round(this.percent * (200-16-4)), 8);
		
		};
		
		return bossbar;
	
	};
	
	return BossBar;

});