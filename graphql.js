require('dotenv').config()
const { gql, GraphQLClient } = require('graphql-request')
const client = new GraphQLClient(process.env.GRAPHQL_API)

module.exports = {
	gql,
	client,
}
