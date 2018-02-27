var canvas = {

	dessiner: function() {

		var el = document.getElementById('c');
		var ctx = el.getContext('2d');

		ctx.lineWidth = 1;
		ctx.lineJoin = ctx.lineCap = 'round';
		ctx.shadowBlur = 2;
		ctx.shadowColor = 'rgb(0, 0, 0)';
		
		var isDrawing, points = [ ];
		
		el.onmousedown = function(e) {
		  isDrawing = true;
		  points.push({ x: e.offsetX, y: e.offsetY });
		};
		
		el.onmousemove = function(e) {
			
		  if (!isDrawing) return;
		  detectCanvas = true;
		  points.push({ x: e.offsetX, y: e.offsetY });
		
		  ctx.beginPath();
		  ctx.moveTo(points[0].x, points[0].y);
		  for (var i = 1; i < points.length; i++) {
		    ctx.lineTo(points[i].x, points[i].y);
		  }
		  ctx.stroke();
		};
		
		el.onmouseup = function() {
		  isDrawing = false;
		  points.length = 0;
		};
		
		
		el.addEventListener('touchstart', function(e){
			ctx.fillRect(0,0,300,300);
			detectCanvas = true;
		}, false);
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	}

};