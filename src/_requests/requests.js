const _ = require('lodash')
const { writeFileSync, createWriteStream } = require('fs')
const stringify = require('json-stringify-safe')
const { resolve } = require('path')

function makeSuggestions(arr, title) {
	const filter = arr.filter((item) => item.title !== title)

	const shuffle = _.shuffle(filter).slice(0, 2)

	return shuffle
}

function changeImageExtension(object, ext = 'webp') {
	function replaceExt(url) {
		if (url.split('.').pop() !== 'webp') {
			return url.substr(0, url.lastIndexOf('.')) + '.' + ext
		}
		return url
	}

	object.url = replaceExt(object.url)
	for (let index in object.formats) {
		object.formats[index].url = replaceExt(object.formats[index].url)
	}

	return object
}

function writeDataFile(path, data) {
	writeFileSync(resolve(__dirname, path), stringify(data))
}

function writeDataStream(path, data) {
	writeFileSync(resolve(__dirname, path), '', { encoding: 'utf8' })
	const writer = createWriteStream(resolve(__dirname, path));
	writer.write('[\n');
	data.map((item, index) => {
		writer.write(stringify(item));
		if (index !== data.length - 1) {
			writer.write(',\n');
		}
	})
	writer.write('\n]');
	writer.on('error', (err) => {
		console.log(err)
	})
}

module.exports = {
	changeImageExtension,
	makeSuggestions,
	writeDataFile,
	writeDataStream,
}
