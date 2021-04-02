const { client, gql } = require('../../graphql')
const _ = require('lodash')

function makeSuggestion(repos, title) {
	const filter = repos.filter((item) => item.title !== title)

	const shuffle = _.shuffle(filter).slice(0, 2)

	return shuffle
}

async function fetchData() {
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
			return {
				...i,
				tags: i.tags.map((tag) => tag.name),
			}
		})

		repos = repos.map((i) => {
			return {
				...i,
				suggestions: makeSuggestion(repos, i.title),
			}
		})

		return repos
	} catch (e) {
		console.log(e)
	}
}

module.exports = fetchData
