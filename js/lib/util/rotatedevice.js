var RotateDevice = {
	supported: false
};

Horizon.util = Horizon.util || {};
Horizon.util.rotatedevice = RotateDevice;

RotateDevice.setup = function (params) {

	this.table = document.createElement('div');
	this.table.id = 'rotate-device';
	this.table.style.backgroundColor = 'black';
	this.table.style.width = '100%';
	this.table.style.height = '100%';
	this.table.style.position = 'fixed';
	this.table.style.left = 0;
	this.table.style.top = 0;
	
	var tableCell = document.createElement('div');
	tableCell.style.display = 'table-cell';
	tableCell.style.verticalAlign = 'middle';
	tableCell.style.textAlign = 'center';
	tableCell.style.color = 'white';
	tableCell.innerText = 'Please rotate your device';
	
	this.table.appendChild(tableCell);
		
	if(screen.orientation.angle === (90 || 180)){
		this.table.style.display = 'none';
		//Engine.run();
	} else {
		this.table.style.display = 'table';
		//Engine.stop();
	}
	
	document.body.appendChild(this.table);
	
};

RotateDevice.change = function(e) {

	console.log(e);
	
	if(screen.orientation.angle === (90 || 180)){
		this.table.style.display = 'none';
		this.valid = true;
		Engine.run();
	} else {
		this.table.style.display = 'table';
		this.valid = false;
		Engine.stop();
	}
    
};

if(screen.orientation !== undefined){
	RotateDevice.supported = true;
	RotateDevice.setup();
	window.addEventListener('orientationchange', RotateDevice.change);
}