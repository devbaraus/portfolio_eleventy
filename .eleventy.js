const htmlmin = require('html-minifier')
const prettyjson = require('json-stringify-pretty-compact')
const { parseISO, format } = require('date-fns')
const markdown = require('./src/_filters/markdown')

String.prototype.capitalized = function () {
	return this.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
	})
}

module.exports = (config) => {
	config.addFilter('markdown', (value) => {
		return markdown.makeHtml(value)
	})
	config.addFilter('tag', (name) => {
		name = name.toLowerCase()
		if (['html', 'html5'].includes(name)) return 'HTML'
		if (['react', 'reactjs'].includes(name)) return 'ReactJS'
		if (['reactnative'].includes(name)) return 'React Native'
		if (['nuxt', 'nuxtjs'].includes(name)) return 'NuxtJS'
		if (['node', 'nodejs'].includes(name)) return 'NodeJS'
		if (['css', 'css3'].includes(name)) return 'CSS'
		if (['github'].includes(name)) return 'GitHub'
		if (['php'].includes(name)) return 'PHP'
		if (['vue', 'vuejs'].includes(name)) return 'VueJS'
		if (['js', 'javascript'].includes(name)) return 'JavaScript'
		if (['ts', 'typescript'].includes(name)) return 'TypeScript'
		if (['github'].includes(name)) return 'GitHub'
		if (['tailwind', 'tailwindcss'].includes(name)) return 'TailwindCSS'
		if (['dev', 'devto'].includes(name)) return 'DEV'
		if (['postgres', 'postgresql', 'pg'].includes(name)) return 'PostgreSQL'
		if (['markdown'].includes(name)) return 'MarkDown'
		return name.capitalized()
	})
	config.addFilter('date', function (date, dateFormat, parse = true) {
		if (parse) {
			date = parseISO(date)
		}
		return format(date, dateFormat)
	})
	config.addPassthroughCopy({ public: './' })
	config.setBrowserSyncConfig({
		files: ['dist/**/*'],
		open: true,
		// Tweak for Turbolinks & Browserstack Compatibility
		snippetOptions: {
			rule: {
				match: /<\/head>/i,
				fn: function (snippet, match) {
					return snippet + match
				},
			},
		},
	})
	config.setDataDeepMerge(true)
	config.addTransform('htmlmin', function (content, outputPath) {
		if (
			process.env.NODE_ENV === 'production' &&
			outputPath &&
			outputPath.endsWith('.html')
		) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
			})
			return minified
		}

		return content
	})
	config.addTransform('prettyjson', function (content, outputPath) {
		if (
			process.env.NODE_ENV === 'production' &&
			outputPath &&
			outputPath.endsWith('.json')
		) {
			let jsonObject = JSON.parse(content)
			let prettified = prettyjson(jsonObject, { indent: 2 })
			return prettified
		}
		return content
	})

	return {
		dir: {
			input: 'src',
			output: 'dist',
		},
	}
}
