require('dotenv').config()
const axios = require('axios')

const { client, gql } = require('../../graphql')

const { GITHUB_USERNAME, GITHUB_TOKEN, DEVTO_TOKEN } = process.env

const githubAxios = axios.create({
	baseURL: 'https://api.github.com',
	auth: {
		username: GITHUB_USERNAME,
		password: GITHUB_TOKEN,
	},
})

const devtoAPI = axios.create({
	baseURL: 'https://dev.to/api',
})

devtoAPI.defaults.headers['api-key'] = DEVTO_TOKEN

async function fetchProfiles() {
	async function getGitHubProfile() {
		const { data } = await githubAxios.get('/user', {
			headers: {
				Accept: 'application/vnd.github.v3+json',
			},
		})

		const profile = {
			username: data.login,
			bio: data.bio,
			avatar: data.avatar_url,
			url: data.html_url,
			name: data.name,
			followers: data.followers,
			following: data.following,
			repos: data.public_repos,
		}

		return profile
	}

	async function getDevProfile() {
		const { data } = await devtoAPI.get('/users/me')

		const articles = await client.request(gql`
			query {
				articlesConnection {
					aggregate {
						totalCount
						sum {
							public_reactions_count
						}
					}
				}
			}
		`)

		const profile = {
			username: data.username,
			name: data.name,
			bio: data.summary,
			joined: data.joined_at,
			avatar: data.profile_image,
			url: `https://dev.to/${data.username}`,
			articles: articles.articlesConnection.aggregate.totalCount,
			reactions:
				articles.articlesConnection.aggregate.sum.public_reactions_count,
		}

		return profile
	}

	return {
		github: await getGitHubProfile(),
		dev: await getDevProfile(),
	}
}

module.exports = fetchProfiles
