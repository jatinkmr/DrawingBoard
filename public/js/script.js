function drawLine(context, x1, y1, x2, y2) { 
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.stroke();	
}

document.addEventListener("DOMContentLoaded", () => {
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var width = window.innerWidth;
	var height = window.innerHeight;

	canvas.width = width;
	canvas.height = height;

	var drawing = false;
	var s, y, preX, preY;

	var socket = io.connect();

	canvas.onmousedown = function (e) { 
		drawing = true;
		preX = x;
		preY = y;
	}

	canvas.onmouseup = function (e) { 
		drawing = false;
	}

	canvas.onmousemove = function (e) { 
		x = e.clientX;
		y = e.clientY;
		if (drawing) { 
			socket.emit('draw', {
				'x1': preX,
				'y1': preY,
				'x2': x,
				'y2': y
			});

			drawLine(context, preX, preY, x, y);
			preX = x;
			preY = y;
		}
	}

	socket.on('draw', (data) => { 
		drawLine(context, data.x1, data.y1, data.x2, data.y2);
	});
 });