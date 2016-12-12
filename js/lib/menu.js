define(function () {

	var Menu = {
		items: ['resume', 'options', 'restart', 'quit'],
		update: function () {
		
		},
		render: function () {
	
			EXP.engine.ctx.fillStyle = '#F0F';
			EXP.engine.ctx.fillRect(0, 0, EXP.engine.width, EXP.engine.height);
	
		}
	};

	return Menu;

});