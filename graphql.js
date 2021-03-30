const { gql, GraphQLClient } = require('graphql-request')

const client = new GraphQLClient('https://strapifoliographql.herokuapp.com/graphql')

module.exports = {
  gql,
  client,
}
