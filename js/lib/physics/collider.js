define(function () {

	function Collider(params) {
					
		this.parent = params.parent || null;
		this.x = params.x || 0;
		this.y = params.y || 0;
		this.left = params.left || 0;
		this.top = params.top || 0;
		this.width = params.width || 0;
		this.height = params.height || 0;
		
		this.update = function () {
			
			if(this.parent === null) return;
			
			this.x = this.parent.x;
			this.y = this.parent.y;
			
		};
		
		this.render = function () {
		
			if(!EXP.debug.colliders) return;
		
			EXP.engine.ctx.fillStyle = 'rgba(0,255,0,0.5)';
			EXP.engine.ctx.fillRect(
				Math.round(this.x + this.left - EXP.camera.x),
				Math.round(this.y + this.top - EXP.camera.y),
				this.width,
				this.height
			);
		
		};
		
	}
	
	return Collider;

});