define(function () {

	var Items = {

		gold: {
			x: 64,
			y: 64,
			label: "gold",
			tilesheetSrc: "images/tilesheets/items/gold.png",
			onCollisionEnter: function (obj) {
				if(!this.collided){
						console.log('picked up '+ this.label);
						
						EXP.sound.play('health');
						
						if(obj.inventory !== undefined) {
							obj.inventory.push(this);
							this.disabled = true;
							this.hidden = true;
						}
					}
				
					this.collided = true;
					this.colliding = true;
			}
		},
		
		rock: {
			x: 64,
			y: 0,
			label: "rock",
			tilesheetSrc: "images/tilesheets/items/rock.png"
		}
		
	};
	
	return Items;
});