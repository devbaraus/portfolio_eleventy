const { writeDataFile } = require('./requests')
const { client, gql } = require('../../graphql')
const { makeSuggestions, changeImageExtension } = require('.//requests')

async function fetchData() {
	try {
		let { projects } = await client.request(gql`
			query {
				projects {
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

		projects = projects.map((i) => {
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

		projects = projects.map((i) => {
			i.suggestions = makeSuggestions(projects, i.title)
			return i
		})

		return projects
	} catch (e) {
		console.log(e)
	}
}

fetchData().then((res) => {
	writeDataFile('../_data/projects.json', res)
})
