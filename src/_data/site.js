'use strict'

const eleventyPackage = require('@11ty/eleventy/package.json')

const env = process.env

const URL = env.URL || 'http://localhost:8080'

module.exports = function () {
	return {
		generator: `${eleventyPackage.name} v${eleventyPackage.version}`,
		today: new Date(),
		url: URL,
		author: 'Bruno de Araújo Alves',
		name: 'DevBaraus | Desenvolvedor Web Full Stack',
		short_name: 'DevBaraus',
		description: `Sou Bruno de Araújo Alves, tenho ${~~(
			(new Date().getTime() - +new Date('1999-08-10T00:00:00+00:00')) /
			31557600000
		)} anos, estudante de Ciência da Computação. Sou Desenvolvedor Web Full Stack, tenho experiência em NodeJS, VueJS, Python entre outras linguagens e frameworks.`,
		keywords: [
			'desenvolvedor',
			'fullstack',
			'stack',
			'nodejs',
			'python',
			'devbaraus',
			'baraus',
			'projetos',
			'repositorios',
			'estudante',
			'ciencia',
			'computacao',
			'codetower',
		].join(', '),
		lang: 'pt',
		dir: 'auto',
		categories: ['portfolio', 'blog'],
		start_url: '/?source=pwa',
		display: 'standalone',
		theme_color: '#EE5622',
		offline_enabled: true,
		background_color: '#f0f0f7',
		shortcuts: [
			{
				name: 'Artigos',
				url: '/articles/',
				description: 'Lista de artigos.',
				icons: [
					{
						src: `${URL}/icons/devto.png`,
						sizes: '192x192',
					},
				],
			},
			{
				name: 'Projetos',
				url: '/projects/',
				description: 'Lista de projetos.',
				icons: [
					{
						src: `${URL}/icons/trello.png`,
						sizes: '192x192',
					},
				],
			},
			{
				name: 'Projetos Pessoais',
				url: '/sides/',
				description: 'Lista de projetos pessoais.',
				icons: [
					{
						src: `${URL}/icons/codersrank.png`,
						sizes: '192x192',
					},
				],
			},
			{
				name: 'Repositórios',
				url: '/repos/',
				description: 'Lista de repositórios públicos',
				icons: [
					{
						src: `${URL}/icons/github.png`,
						sizes: '192x192',
					},
				],
			},
		],
	}
}
