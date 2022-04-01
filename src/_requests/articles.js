let makeSuggestions, changeImageExtension;

if (__dirname.endsWith('_requests')) {
	makeSuggestions = require('./requests').makeSuggestions
	changeImageExtension = require('./requests').changeImageExtension
} else {
	makeSuggestions = require('../_requests/requests').makeSuggestions
	changeImageExtension = require('../_requests/requests').changeImageExtension
}

const { client, gql } = require('../../graphql')

module.exports = async function () {
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

		articles = articles
			.map((i) => {
				i.cover = changeImageExtension(i.cover)
				i.tags = i.tags.map((tag) => tag.name)
				i.reactions = i.public_reactions_count
				i.time = Math.ceil(i.content.replace('\n', '').split(' ').length / 240)
				return i
			})
			.sort((a, b) => {
				return new Date(b.updatedAt) - new Date(a.updatedAt);
			})

		articles = articles.map((i) => {
			i.suggestions = makeSuggestions(articles, i.title)
			return i
		})

		articles.map(i => console.log('Article fetched:', i.title))

		return articles
	} catch (e) {
		console.log(e)
		return {}
	}
}