const _ = require('lodash')

const sendMsg = require('./../../api/sendMsg.js')
const Time = require('./../../api/time.js')

class Timezone {

    _execute(entitys, sender) {
        const time = new Time(entitys.city[0].value)
        time.getTimezone()
            .then(data => sendMsg(sender, `Time for ${time.city} : ${data}`))
            .catch(error => sendMsg(sender, error))
    }

}

module.exports = Timezone