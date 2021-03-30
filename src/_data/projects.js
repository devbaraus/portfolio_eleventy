const { client, gql } = require('../../graphql')

async function fetchData() {
  try {
    let projects = await client.request(gql`
        query {
          projects(limit: 6) {
            _id,
            title,
            url,
            slug,
            tags {
              name
            }
            cover {
              url
              formats
            }
          }
        }
      `,
    )

    projects = projects.projects.map(i => {
      return {
        ...i,
        tags: i.tags.map(tag => tag.name),
      }
    })

    return projects
  } catch (e) {
    console.log(e)
  }
}

module.exports = fetchData
