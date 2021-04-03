module.exports = {
	offline: [
		{ name: 'Home', route: '/', offline: true },
		{ name: 'Habilidades', route: '/#skills', offline: true },
		{ name: 'Contato', route: '/#contact', button: true, offline: true },
	],
	online: [
		{ name: 'Home', route: '/', offline: true },
		{ name: 'Habilidades', route: '/#skills', offline: true },
		{ name: 'Artigos', route: '/#articles' },
		{ name: 'Projetos', route: '/#projects' },
		{ name: 'Repositórios', route: '/#repos' },
		{ name: 'Contato', route: '/#contact', button: true, offline: true },
	],
}
