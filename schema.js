//require graphql
const graphql = require('graphql')
// use object destructuring to get the values
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = graphql

const posts = [
  {
    title: 'First post',
    description: 'Content of the first post',
    author: 'Flavio'
  },
  {
    title: 'Second post',
    description: 'Content of the second post',
    author: 'Roger'
  }
]

const authors = {
  'Flavio': {
    name: 'Flavio',
    age: 36
  },
  'Roger': {
    name: 'Roger',
    age: 7
  }
}
//Let’s start with the author. An author has a name and an age.

const authorType = new GraphQLObjectType({
    name: 'Author',
    fields: {
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        }
    }
})
//Next is postType. A post has a title, a description (both strings) and an author. An author is of type authorType, which we just defined, and it has a resolver.

// We get the author name from the source parameter, which is the params passed to the post object, and we lookup the author data based on that. We return it.
const postType = new GraphQLObjectType({
    name: 'Post',
    fields: {
        title: {
            type: GraphQLString
        }, 
        description: {
            type: GraphQLString
        },
        author: {
            type: authorType,
            resolve: (source, params) => {
                return authors[source.author]
            }
        }
    }
})

// Next up is queryType, the root type we’ll add to the schema. In there, we define 2 fields:

// post a single blog post, identified by an id
// posts the list of posts
//both of them have a resolver function to lookup the data in the posts array:

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    post: {
      type: postType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (source, { id }) => {
        return posts[id]
      },
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: () => {
        return posts
      },
    },
  },
})


//initialize a new graphql schema instance, passing an object that contains a query prepery. This property is an instance of a GraphQLObjectType.

const schema = new GraphQLSchema({
    query: queryType
        
})


module.exports = schema