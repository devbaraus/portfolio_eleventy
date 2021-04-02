const { client, gql } = require('../../graphql')
const _ = require('lodash')

function makeSuggestion(arr, title) {
	const filter = arr.filter((item) => item.title !== title)

	const shuffle = _.shuffle(filter).slice(0, 2)

	return shuffle
}

async function fetchData() {
	try {
		let articles = await client.request(gql`
			query {
				articles {
					title
					url
					slug
					description
					content
					public_reactions_count
					tags {
						name
					}
					cover {
						url
						formats
					}
					updatedAt
				}
			}
		`)

		articles = articles.articles.map((i) => {
			return {
				...i,
				tags: i.tags.map((tag) => tag.name),
				reactions: i.public_reactions_count,
				time: Math.ceil(i.content.replace('\n', '').split(' ').length / 240),
			}
		})

		articles = articles.map((i) => {
			return {
				...i,
				suggestions: makeSuggestion(articles, i.title),
			}
		})

		return articles
	} catch (e) {
		console.log(e)
	}
}

module.exports = fetchData
