const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const APIKEY_MAILERLITE = require('./apikey')
const path = require('path');


const app = express();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use(bodyParser.json());



app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', 'https://church-uconnect.herokuapp.com');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With', 'Content-Type', 'Accept');

    next();
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}



app.post('/api/sendformdata',(req,res,next) => {

    let subscriberInfo = req.body;

    let groupIds = {
        //These are the ID's of the real groups that the client uses for groups of mailer lite.
        'churchmin': 10803180,
        'fammin': 10803188,
        'singmin': 10803198,
        'lifehope': 76232020,
        'coupmin': 76232322
    };

    let testIds = {
        'churchmin':75159942,
        'fammin':75159832,
        'singmin':75156046,
        'coupmin':75159756,
        'lifehope':75159830
    }
 

    for (key in subscriberInfo) {
        if (key === 'churchmin' || key === 'fammin' || key === 'singmin' || key === 'coupmin' || key === 'lifehope'){
            //Looks up key id and subscribes subscriber to that group with a post request
            axios({
                method: 'post',
                url: `https://api.mailerlite.com/api/v2/groups/${groupIds[key]}/subscribers`,
                headers: {
                    'Content-Type': 'application/json',
                    'X-MailerLite-ApiKey': APIKEY_MAILERLITE
                },
                data: {
                    email: subscriberInfo['email'],
                    name: subscriberInfo['first'] + ' ' + subscriberInfo['last'],
                    fields: {
                        phone: subscriberInfo['number'],
                        address1: subscriberInfo['address1'],
                        address2: subscriberInfo['address2'],
                        city: subscriberInfo['city'],
                        zip: subscriberInfo['zip'],
                        state: subscriberInfo['state'],
                        country: subscriberInfo['country']
                    }
                }
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
        };
    };
    next();
    return res.send("Success")
});
const port = process.env.PORT || 8080;
app.listen(port,() => console.log(`App running on port ${port}...`));