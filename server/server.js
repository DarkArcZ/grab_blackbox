const express = require('express');
const app = express()

app.get('/temperature', function (req,res) {
	res.send('24C');
	});

app.get('/humidity', function(req, res) {
	req.send('48%');
	});

app.get('/public', function(req, res) {
	res.sendFile(path.join(_dirname, 'index.html'))
})

app.listen(3000, function(){
	console.log('Server listening on port 3000');
	});


