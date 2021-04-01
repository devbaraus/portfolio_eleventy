const showdown = require('showdown')
const showdownHighlight = require('showdown-highlight-pre')

const markdown = new showdown.Converter({
	omitExtraWLInCodeBlocks: true,
	ghCompatibleHeaderId: true,
	simplifiedAutoLink: true,
	strikethrough: true,
	tables: true,
	ghCodeBlocks: true,
	smartIndentationFix: true,
	simpleLineBreaks: true,
	ghMentions: true,
	encodeEmails: true,
	openLinksInNewWindow: true,
	emoji: true,
	literalMidWordUnderscores: true,
	extensions: [showdownHighlight({ pre: true })],
})

module.exports = markdown
