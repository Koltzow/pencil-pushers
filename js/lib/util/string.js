String.prototype.getHashCode = function() {
    var hash = 0;
    if (this.length == 0) return hash;
    for (var i = 0; i < this.length; i++) {
        hash = this.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

String.prototype.color = function (seed) {

	
	var hash = this.getHashCode();
	var color = hash.intToHSL();
		
	return color;

};

String.prototype.randomBetween = function(min, max) {

	var hash = this.getHashCode();
	    
    min = min || 0;
    max = max || 1;
    
    var seed = (hash * 9301 + 49297) % 233280;
    var rnd = Math.abs(seed / 233280.0);
        
    return min + rnd * (max - min);
    
};