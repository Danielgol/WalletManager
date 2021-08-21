const https = require('https');


const banco = [
    {name: 'B-BRA', value: 1285.00, prefix: 'BRL', key: '1'},
    {name: 'CCTRF', value: 640.00, prefix: 'BRL', key: '2'},
    {name: 'CAIXA', value: 4760.00, prefix: 'BRL', key: '3'},
    {name: 'CASA', value: 300.00,  prefix: 'USD', key: '4'},
    {name: 'BTC', value: 0.00502102, prefix: 'BTC', key: '5'},
    {name: 'BTC-RIPIO', value: 0.00115792, prefix: 'BTC', key: '6'},
    {name: 'ETH-RIPIO', value: 0.00312455, prefix: 'ETH', key: '7'}
];

const contadores = [
    {name: 'FIRST', prefix: 'BRL', bags: ['1','2','3']},
    {name: 'SECOND', prefix: 'BTC', bags: ['5','6']},
    {name: 'THIRD', prefix: 'ETH', bags: ['7']},
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
    }
}
