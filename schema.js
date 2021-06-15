//require graphql
const graphql = require('graphql')
// use object destructuring to get the values
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = graphql


//initialize a new graphql schema instance, passing an object that contains a query prepery. This property is an instance of a GraphQLObjectType.

const schema = new GraphQLSchema({
    query: newGraphQLObjectType({
        // must specidy a name and fields parameers
        name: "RootQueryType",
        fields: {
            hello: {
                type: GraphQLString,
                resolve() {
                    return 'Sam'
                }
            }
        }

    })
})


module.exports = schema