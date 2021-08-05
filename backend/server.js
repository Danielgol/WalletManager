
const express = require('express');
const app = express();
const https = require('https');

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) =>{

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

app.listen(PORT, () => console.log('Server started on port '+PORT));