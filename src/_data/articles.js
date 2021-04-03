const { client, gql } = require('../../graphql')
const _ = require('lodash')

function makeSuggestion(arr, title) {
	const filter = arr.filter((item) => item.title !== title)

	const shuffle = _.shuffle(filter).slice(0, 2)

	return shuffle
}

function changeImageExtension(article, ext) {
	function replaceExt(url, ext) {
		if (url.split('.').pop() !== 'webp') {
			return url.substr(0, url.lastIndexOf('.')) + '.' + ext
		}
		return url
	}

	article.cover.url = replaceExt(article.cover.url, 'webp')
	for (let index in article.cover.formats) {
		article.cover.formats[index].url = replaceExt(
			article.cover.formats[index].url,
			'webp',
		)
	}

	return article
}

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
						formats
					}
					updatedAt
				}
			}
		`)

		articles = articles.map((i) => {
			i = changeImageExtension(i)
			i.tags = i.tags.map((tag) => tag.name)
			i.reactions = i.public_reactions_count
			i.time = Math.ceil(i.content.replace('\n', '').split(' ').length / 240)
			i.suggestions = makeSuggestion(articles, i.title)
			return i
		})
		return articles
	} catch (e) {
		console.log(e)
	}
}

module.exports = fetchData
