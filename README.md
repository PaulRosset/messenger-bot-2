# messenger-bot-2
🤖🤖
We just built up a basic functionnal messenger bot ([Previous git repo](https://github.com/PaulRosset/messenger-bot.git)), so we can go further by implementing the Wit.ai API and the strategies pattern, this two functionalities works great together.

Your bot will be able to answer to an order, like : 

"Give me the timezone of Seoul"

## Description Wit.ai

I let you discover this great API at [Wit.ai](https://wit.ai/).

It's highly recommanded to read the whole documentation of Wit.ai to understand everythings.

To sum up quickly, we will use the Wit.ai API to recognize keyswords from a plain text sentence. Once the API recognize the keysword asked, the API will assign a value to the word recognized. The value of this word, will be return.

We will use the nodejs API of Wit.ai which provide some great shortcuts function to make HTTP request : [Wit.ai NodeJS](https://github.com/wit-ai/node-wit) 

```
clientWit.message(message, {}).then(data => {
    // Cut the message in defined entitys
})
```

Above, we used the function ... which takes the sentence to handle and return in Promise style, here is the json : 

```
{ identificator: 
   [ { confidence: 0.97399405092159,
       value: 'timezone',
       type: 'value' } ],
  city: 
   [ { suggested: true,
       confidence: 0.81392205715065,
       value: 'London',
       type: 'value' } ] }
```

We are strongly interested with the values of entitys that are returned in the json.

Here, is the link of my Wit.ai [app](https://wit.ai/PaulRosset/messenger-bot/) that I created for this repo.

## Description Strategies Pattern

The strategies pattern consist to encapsulate algorithms and enable a behavior at run time. To get more explanation, you can read this [explanation](https://en.wikipedia.org/wiki/Strategy_pattern).

There is Three steps to implement the pattern, in our case, here they are : 
 
- Create a strategie called strategieTimezone (every strategies have to got the same architecture) :

```
class Timezone {

    _execute(entitys, sender) {
        // You code goes here
    }

}
```

- Create the utility class which will help us to decide the behavior at run time :

```
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
```

- Finally, create the interface, to instanciate the right stategie :

```
clientWit.message(message, {}).then(data => {
        // Entitys returned
        const entitys = data.entities

        // Verification that Wit.ai handle correctly the message, with the identificator.
    if (!(_.isUndefined(entitys.identificator))) {
        let identificator = entitys.identificator[0].value

        // Get the value of the identificator to knwo which algorithm use
        let StrategiesService = factory.getStrategies(identificator)

        // Then, instanciate the right algorithm
        const service = new StrategiesService()

        // Finally, execute it
        service._execute(entitys, sender)
    } else
        sendmsg(sender, 'I dont understand, sorry :)')
})
```

## Simple to maintain

Now, if you want to add a new feature , you just have to insert a new strategie by filling the object with the right value and create the strategie wanted.

The strategie pattern help to have a clearer and understandble code, in particular avoid multiple dirty **if** or **switch** statement. 

**Easy to maintain and clear to understand !**

## License

MIT

