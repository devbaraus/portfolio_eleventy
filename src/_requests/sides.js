const { writeDataFile } = require('./requests')
const { client, gql } = require('../../graphql')
const { makeSuggestions, changeImageExtension } = require('./requests')

async function fetchData() {
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

		sides = sides.map((i) => {
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

		sides = sides.map((i) => {
			i.suggestions = makeSuggestions(sides, i.title)
			return i
		})

		return sides
	} catch (e) {
		console.log(e)
	}
}

fetchData().then((res) => {
	writeDataFile('../_data/sides.json', res)
})
