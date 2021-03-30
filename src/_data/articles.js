const { client, gql } = require('../../graphql')

async function fetchData() {
  try {
    let articles = await client.request(gql`
        query {
          articles(limit: 6, sort: "published_at ASC") {
            _id,
            title,
            url,
            slug,
            description,
            tags {
              name
            }
            cover {
              formats
            }
          }
        }
      `,
    )

    articles = articles.articles.map(i => {
      return {
        ...i,
        tags: i.tags.map(tag => tag.name),
      }
    })

    return articles
  } catch (e) {
    console.log(e)
  }
}

module.exports = fetchData
