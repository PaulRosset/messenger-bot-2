const _ = require('lodash')

// Require the strategies you want to implement :
const Timezone = require('./strategies/strategiesTimezone.js')

const identificator = {

        // each time you want to add new feature, you have to fill this object :
    serviceDescription: [
        {id: 'timezone', service: Timezone}
    ],

        // return the correct service to instanciate
    getService: function (id) {
      return _.find(this.serviceDescription, {id:id}).service
    }

}

module.exports = identificator