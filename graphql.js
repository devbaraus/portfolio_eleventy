const { gql, GraphQLClient } = require('graphql-request')

// const client = new GraphQLClient('https://strapifoliographql.herokuapp.com/graphql')
const client = new GraphQLClient('http://localhost:1337/graphql')

module.exports = {
	gql,
	client,
}
