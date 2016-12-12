define(function () {

	var Collision = {};
	
	Collision.test = function (a, b) {
		
		var aX = a.x,
			aY = a.y,
			aW = a.width,
			aH = a.height,
			bX = b.x,
			bY = b.y,
			bW = b.width,
			bH = b.height;
			
		
		if(a.collider !== undefined){		
			aX = aX+a.collider.left;
			aY = aY+a.collider.top;
			aW = a.collider.width;
			aH = a.collider.height;
		}
		
		if(b.collider !== undefined){
			bX = bX+b.collider.left;
			bY = bY+b.collider.top;
			bW = b.collider.width;
			bH = b.collider.height;
		}
		
		if(aX + aW > bX && aX < bX + bW && aY + aH > bY && aY < bY + bH){
				
			if(aY <= bY - (bH/2)) return 'top';
			if(aY >= bY + (bH/2)) return 'bottom';
			if(aX < bX) return 'left';
			if(aX > bX) return 'right';
			  
			return true;
			
		} else {
			return false;
		}
		 
	}
	
	return Collision;

});