define(function () {

	var JetfuelBar = {
		percent: 1,
		target: 1,
		cooldown: 0,
		cooldownStart: 30*5,
		x: 20,
		y: 24,
		icon: new Image()
	};
	
	JetfuelBar.icon.src = 'images/tilesheets/ui/ui.png';
	
	JetfuelBar.update = function () {
	
		if(this.cooldown > 0){
			this.cooldown--;
			
			if(this.cooldown === 0){
				this.target = 1;
			}
		}
		
		this.target = (this.target < 0)?0:this.target;
		this.target = (this.target > 1)?1:this.target;
		
		if(this.target <= 0 && this.cooldown === 0){
			EXP.sound.play('jpempty');
			this.cooldown = this.cooldownStart;
		}
		
		this.percent += (this.target - this.percent) * 0.1;
		this.percent = this.target;
		
		
	};
	
	JetfuelBar.render = function () {
	
		EXP.engine.ctx.drawImage(this.icon, 0, 24*3, 24, 24, this.x, this.y, 24, 24);
		
		EXP.engine.ctx.fillStyle = 'rgba(0,0,0,0.5)';
		EXP.engine.ctx.fillRect(this.x+20, this.y + 4, 103, 16);
		
		EXP.engine.ctx.fillStyle = 'rgba(255,255,255,0.3)';
		EXP.engine.ctx.fillRect(this.x+20, this.y + 8, 100, 8);
			
		EXP.engine.ctx.fillStyle = '#00beff';
		EXP.engine.ctx.fillRect(this.x + 20, this.y + 8, Math.floor(this.percent * 100), 8);
		
	};
	
	return JetfuelBar;
	
});