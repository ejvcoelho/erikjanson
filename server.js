const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const request = require('request');
const { log } = require('console');
var people = [];

fs.readFile('InfosPeople.json', function read(err, data){
    if(err){
        throw err;
    }
    try{
        var peopleInfo = JSON.parse(data);
        people = peopleInfo;
    }catch(e){
        console.log("Arquvio vazio");
    }
})

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', express.static(__dirname));

app.post('/', (req, res) => {
    console.log(req);
});

app.post('/subscribe', (req, res)=>{
    if(
        req.body.reCaptcha === undefined || 
        req.body.reCaptcha === '' ||
        req.body.reCaptcha === null
    ){
        return res.json({"success": false, "msg": "Preencha o reCaptcha!"})
    }
   
    const secretKey = '6Lebh3MqAAAAAB0aAJbJA__1jJF4mALySIDtRSoY';
    
    const verifyUrl = 'https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.reCaptcha}&remoteip=${ req.connection.remoteAddress}'
    
    request(verifyUrl, (err, response, body)=>{
        body = JSON.parse(body);

        if(body.success !== undefined && !body.success){
            return res.json({"success": false, "msg": "Verificação Falhou!"})
        }
        return req.json({"success": true, "msg": "Verificação bem sucedida"})
    })

    var data = req.body;
    people.push(data);

    fs.writeFile('InfosPeople.json', JSON.stringify(people, null, 2), (e) => {
        console.log(e)
    })

});

app.listen(3000, ()=>{
    console.log("servidor iniciado na porta 3000!");
})