
const express = require('express');
const app = express();
const https = require('https');

var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000;

var banco = [
		{name: 'B-BRA', value: 1280.00, key: '1'},
		{name: 'CCTRF', value: 1390.00, key: '2'},
    	{name: 'CAIXA', value: 4760.00, key: '3'},
    	{name: 'CASA', value: 300.00, key: '4'},
    	{name: 'BTC', value: 2.00, key: '5'}];


app.get('/btc', (req, res) =>{

	const api_url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

	https.get(api_url, (resp) => {
		let data = '';

		resp.on('data', (chunk) => {
			data += chunk;
		});

		resp.on('end', () => {
			data = JSON.parse(data);
			var btc_value = parseFloat(data.bpi.USD.rate.replace(',',''));
			console.log(btc_value);
			res.send(btc_value+'');
		});
	});

});

app.get('/data', (req, res) =>{
	console.log('Receiving request!');
	res.json(banco);
});

app.post('/post', (req, res) =>{

	let json = req.body;
	console.log(json);

	for(var i=0; i<banco.length; i++){
		if(banco[i].name === json.name){
			console.log(banco[i].name);
			banco[i].value = json.value;
			break;
		}
	}

	res.json(banco);
});

app.listen(PORT, () => console.log('Server started on port '+PORT));