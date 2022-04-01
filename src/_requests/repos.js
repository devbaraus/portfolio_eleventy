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



		repos = repos.repositories
			.map((i) => {
				i.tags = i.tags.map((tag) => tag.name)
				return i
			})
			.sort((a, b) => {
				return new Date(b.updatedAt) - new Date(a.updatedAt);
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