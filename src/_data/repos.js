const { client, gql } = require('../../graphql')
const _ = require('lodash')

function makeSuggestion(repos, name) {
	const filter = repos.filter((item) => item.name !== name)

	const shuffle = _.shuffle(filter).slice(0, 2)

	return shuffle
}

async function fetchData() {
	try {
		let repos = await client.request(gql`
			query {
				repositories(where: { private: false }) {
					id
					name
					description
					homepage
					stargazers_count
					slug
					size
					url
					readme
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
				suggestions: makeSuggestion(repos, i.name),
			}
		})

		return repos
	} catch (e) {
		console.log(e)
	}
}

module.exports = fetchData
