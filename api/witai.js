const Wit = require('node-wit')

const client = Wit.Wit({
    accessToken: '<YOUR_SERVER_ACCESS_TOKEN>'
})

module.exports = client

// Here is the simple example, to test, to good return of value :

 /*const text = "What's the time in London"

 client.message(text, {}).then((data) => {
 //console.log(data.entities)
 let entitys = data.entities
 console.log(entitys)
 }).catch((err) => {
 console.log(err)
})*/
