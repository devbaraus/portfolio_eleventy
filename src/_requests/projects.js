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

		projects = projects
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

		projects = projects.map((i) => {
			i.suggestions = makeSuggestions(projects, i.title)
			return i
		})

		projects.map(i => console.log('Project fetched:', i.title))

		return projects
	} catch (e) {
		console.log(e)
	}
}