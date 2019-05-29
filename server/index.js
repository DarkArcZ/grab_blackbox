const express = require('express');
const app = express()

app.get('/temperature', function (req,res) {
	res.send('24C');
	});

app.get('/humidity', function(req, res) {
	req.send('48%');
	});

app.listen(3000, function(){
	console.log('Server listening on port 3000');
	});


