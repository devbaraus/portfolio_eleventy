const htmlmin = require('html-minifier')
const prettyjson = require('json-stringify-pretty-compact')
const { parseISO, format } = require('date-fns')
const markdown = require('./src/_filters/markdown')

module.exports = (config) => {
	config.addFilter('markdown', (value) => {
		return markdown.makeHtml(value)
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
