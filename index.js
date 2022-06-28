const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const qr = require('qrcode');
const { path } = require('express/lib/application');
require('dotenv').config();
const port = process.env.PORT;

/**
 * body-parser: - middlware for parsing bodies from URL
 *              - for parsing json objects
 * among: nằm trong số
 *  */ 

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: false})) 
app.use(bodyParser.json())

//create listener to root route(/) and render the index.ejs 
app.get('/', (req, res) => {
    res.render('index');
})

//A Post request listener to convert Text/URL to QRcode
app.post('/scan', (req, res) => {
    const url = req.body.url;
    if(url.length === 0) {
        res.send('Empty data');
    }
    qr.toDataURL(url, (err, src) => {
        if(err) res.send('error occured');
        res.render('scan', {src});
    });
})

//config the ports we are listening to this line starts the server
app.listen(port, () => {
    console.log('Server at 3000');
})