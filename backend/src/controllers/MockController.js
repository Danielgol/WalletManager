const https = require('https');


const banco = [
    {name: 'B-BRA', value: 1000.00, prefix: 'BRL', key: '1'},
    {name: 'ITAU', value: 900.00, prefix: 'BRL', key: '2'},
    {name: 'CAIXA', value: 800.00, prefix: 'BRL', key: '3'},
    {name: 'NUBANK', value: 700.00,  prefix: 'BRL', key: '4'},
    {name: 'CASA', value: 600.00,  prefix: 'USD', key: '5'},
    {name: 'BTC', value: 0.00555555, prefix: 'BTC', key: '6'},
    {name: 'CONTA-ALT', value: 0.00222222, prefix: 'BTC', key: '7'},
    {name: 'ETHERBANK', value: 0.00333333, prefix: 'ETH', key: '8'},
];

const contadores = [
    {name: 'Total', prefix: 'BRL', bags: ['1','2','3','4']},
    {name: 'Bitcoin', prefix: 'BTC', bags: ['6','7']},
    {name: 'Etherium', prefix: 'ETH', bags: ['8']},
];


module.exports = {
    getBTC(req, res) {
        const apiUrl = 'https://api.coindesk.com/v1/bpi/currentprice.json';

        https.get(apiUrl, (resp) => {
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
    },

    getAllData(req, res) {
        console.log('Receiving request!');

        const json = {
            banco: banco,
            contadores: contadores,
        }

        res.json( json );
    },

    postDataUpdate(req, res) {
        let json = req.body;
        console.log(json);
        for(var i=0; i<banco.length; i++){
            if(banco[i].name === json.name){
                console.log(banco[i].name);
                banco[i].value = json.value;
                banco[i].prefix = json.prefix;
                break;
            }
        }
        res.json(banco);
    },

    postCreateBag(req, res) {
        let json = req.body;
        console.log(json);
        banco.push({
            name: json.name,
            value: json.value,
            prefix: json.prefix,
            key: banco.length+1,
        });
        res.json(banco);
    },

    postCreateCounter(req, res) {
        let json = req.body;
        console.log(json);
        contadores.push({
            name: json.name,
            prefix: json.prefix,
            bags: json.bags,
        });
        res.json(contadores);
    }
}
