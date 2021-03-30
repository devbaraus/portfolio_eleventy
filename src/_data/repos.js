const { client, gql } = require('../../graphql')

async function fetchData() {
  try {
    let repos = await client.request(gql`
        query {
          repositories(limit: 6, where: {private:  false}){
            name
            description
            tags {
              name
            }
          }
        }
      `,
    )

    repos = repos.repositories.map(i => {
      return {
        ...i,
        tags: i.tags.map(tag => tag.name),
      }
    })

    return repos
  } catch (e) {
    console.log(e)
  }
}

module.exports = fetchData
