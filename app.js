const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP
const schma = require('./schema.js')
const app = express()
// graphql middleware
app.use('/graphql', graphqlHTTP({
    //pass in the schema object
    schema: schema,
    graphiql: true
}
    
))
app.listen(3000, () => {
    console.log('App listening on port 3000');
})