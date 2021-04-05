const { writeDataFile } = require('./requests')
const { makeSuggestions } = require('.//requests')
const { client, gql } = require('../../graphql')

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
			i.tags = i.tags.map((tag) => tag.name)
			return i
		})

		repos = repos.map((i) => {
			i.suggestions = makeSuggestions(repos, i.title)
			return i
		})

		return repos
	} catch (e) {
		console.log(e)
	}
}

fetchData().then((res) => {
	writeDataFile('../_data/repos.json', res)
})
