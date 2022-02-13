const { writeDataStream } = require('../_requests/requests')
const { makeSuggestions } = require('../_requests/requests')
const { client, gql } = require('../../graphql')

module.exports = async function () {
	try {
		let repos = await client.request(gql`
			query {
				repositories(where: { private: false }) {
					id
					title: name
					description
					homepage
					stargazers_count
					slug
					size
					url
					updatedAt
					content: readme
					tags {
						name
					}
				}
			}
		`)

		repos = repos.repositories.map((i) => {
			i.tags = i.tags.map((tag) => tag.name)
			return i
		})

		repos = repos.map((i) => {
			i.suggestions = makeSuggestions(repos, i.title)
			return i
		})

		repos.map(i => console.log('Repo fetched:', i.title))

		return repos
	} catch (e) {
		console.log(e)
	}
}