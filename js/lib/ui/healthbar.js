define(function () {

	var HealthBar = {
		ui: []
	};
	
	HealthBar.create = function (id) {
	
		var healthbar = {
			percent: 1,
			target: 1,
			colors: ['#43ffa3', '#f526af', '#23b1ff', '#ff961a'],
			color: null,
			x: 0,
			y: 0,
			icon: new Image()
		};
		
		healthbar.color = healthbar.colors[id-1];
		healthbar.icon.src = 'images/tilesheets/ui/ui.png';
		
		if(id === 1){
			healthbar.x = 10;
			healthbar.y = 10;
		} else if (id === 2) {
			healthbar.x = EXP.engine.width - 110;
			healthbar.y = 10;
		} else if (id === 3) {
			healthbar.x = EXP.engine.width - 110;
			healthbar.y = EXP.engine.height - 26;
		} else if (id === 4) {
			healthbar.x = 10;
			healthbar.y = EXP.engine.height - 26;
		}
			
		healthbar.update = function () {
		
			this.percent += (this.target - this.percent) * 0.1;
			
		};
		
		healthbar.render = function () {
		
			//EXP.engine.ctx.drawImage(this.icon, 0, 0, 24, 24, this.x, this.y, 24, 24);
			
			EXP.engine.ctx.fillStyle = 'rgba(0,0,0,0.5)';
			EXP.engine.ctx.fillRect(this.x, this.y, 100, 16);
			
			EXP.engine.ctx.fillStyle = 'rgba(255,255,255,0.3)';
			EXP.engine.ctx.fillRect(this.x+4, this.y + 4, 100-8, 8);
				
			EXP.engine.ctx.fillStyle = this.color;
			EXP.engine.ctx.fillRect(this.x+4, this.y + 4, Math.round(this.percent * (100-8)), 8);
		
		};
		
		this.ui.push(healthbar);
		
		return healthbar;
	
	};
	
	HealthBar.update = function () {
	
		for (var i = 0; i < this.ui.length; i++) {
			this.ui[i].update();
		}
	
	}
	
	HealthBar.render = function () {
	
		for (var i = 0; i < this.ui.length; i++) {
			this.ui[i].render();
		}
	
	}
	
	return HealthBar;

});