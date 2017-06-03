const _ = require('lodash')
const moment = require('moment-timezone')

class Time {

    constructor(city) {
        this.city = city
    }

    getTimezone() {
        return new Promise((resolve, reject) => {
                _.map(moment.tz.names(), (value, index) => {
                if (_.endsWith(value, this.city)) {
                    resolve(moment.tz(moment.tz.names()[index]).format('HH:mm:ss, DD-MM-YYYY'))
                } else if (moment.tz.names().length === index + 1)
                    reject('Error : City not found')
            })
        })
    }

}

module.exports = Time