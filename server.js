const express = require('express');
const app = express();

app.use(
	express.static(__dirname + '/public')
);

const port = 3291 || process.env.PORT;
app.listen(port, () => { 
	console.log('Server Started at ' + port);
	console.log('http://localhost:3291/');
});