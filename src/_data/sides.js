const { client, gql } = require('../../graphql')

async function fetchData() {
  try {
    let sides = await client.request(gql`
        query {
          sides(limit: 6) {
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

    sides = sides.sides.map(i => {
      return {
        ...i,
        tags: i.tags.map(tag => tag.name),
      }
    })

    return sides
  } catch (e) {
    console.log(e)
  }
}

module.exports = fetchData
