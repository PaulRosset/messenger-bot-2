const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const _ = require('lodash')

const sendmsg = require('./api/sendMsg.js')
const clientWit = require('./api/witai.js')
const interface = require('./pattern/interface.js')

app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('Chat Bot Homepage')
})

app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === '<TOKEN_U_CHOOSE>') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Invalid Token')
});

app.post('/webhook/', function (req, res) {

    const data = req.body
    const message = data.entry[0].messaging[0].message.text
    const sender = data.entry[0].messaging[0].sender.id

    // Message() function which will handle the message from the user
    clientWit.message(message, {}).then(data => {
        // Entitys returned
        const entitys = data.entities

        // Verification that Wit.ai handle correctly the message, with the identificator.
    if (!(_.isUndefined(entitys.identificator))) {
        let identificator = entitys.identificator[0].value

        // Get the value of the identificator to knwo which algorithm use
        let StrategiesService = interface.getStrategies(identificator)

        // Then, instanciate the right algorithm
        const service = new StrategiesService()

        // Finally, execute it
        service._execute(entitys, sender)
    } else
        sendmsg(sender, 'I dont understand, sorry :)')
})

    res.sendStatus(200)
});

app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
