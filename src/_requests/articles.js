const {
	makeSuggestions,
	changeImageExtension,
	writeDataFile,
} = require('.//requests')
const { client, gql } = require('../../graphql')

async function fetchData() {
	try {
		let { articles } = await client.request(gql`
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
						alternativeText
						formats
					}
					updatedAt
				}
			}
		`)

		articles = articles.map((i) => {
			i.cover = changeImageExtension(i.cover)
			i.tags = i.tags.map((tag) => tag.name)
			i.reactions = i.public_reactions_count
			i.time = Math.ceil(i.content.replace('\n', '').split(' ').length / 240)
			return i
		})

		articles = articles.map((i) => {
			i.suggestions = makeSuggestions(articles, i.title)
			return i
		})

		return articles
	} catch (e) {
		console.log(e)
		return {}
	}
}

fetchData().then((res) => {
	writeDataFile('../_data/articles.json', res)
})
