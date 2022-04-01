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
		let { sides } = await client.request(gql`
			query {
				sides {
					_id
					title
					url
					slug
					content
					tags {
						name
					}
					links {
						text
						url
						tag {
							name
						}
					}
					logo
					carousel {
						url
						alternativeText
						formats
					}
					cover {
						alternativeText
						url
						formats
					}
					updatedAt
				}
			}
		`)

		sides = sides
			.map((i) => {
				i.tags = i.tags.map((tag) => tag.name)
				i.carousel = i.carousel.map((j) => changeImageExtension(j))
				i.links = i.links.map((link) => {
					if (!!link.tag) {
						link.tag = link.tag.name
					}
					return link
				})
				return i
			})
			.sort((a, b) => {
				return new Date(b.updatedAt) - new Date(a.updatedAt);
			})

		sides = sides.map((i) => {
			i.suggestions = makeSuggestions(sides, i.title)
			return i
		})

		sides.map(i => console.log('Side fetched:', i.title))

		return sides
	} catch (e) {
		console.log(e)
	}
}