const { execSync } = require('child_process')

const config = {
	input: './public/favicon.svg',
	distFolder: './dist/img/',
	baseName: 'manifest',
	ext: 'png',
	manifestJson: './dist/manifest.json',
	manifestImagesPath: 'img/',
	sizes: [
		[16, 16],
		[48, 48],
		[72, 72],
		[96, 96],
		[120, 120],
		[128, 128],
		[192, 192],
		[384, 384],
		[512, 512],
	],
}

config.sizes.forEach((i) => {
	execSync(
		`yarn sharp	-i ${config.input} -o ${config.distFolder}${config.baseName}-${
			i[0]
		}.${config.ext} resize ${i.join(' ')}`,
		{
			stdio: 'inherit',
		},
	)
})

const fs = require('fs')
const manifest = require(config.manifestJson)

manifest.icons = config.sizes.map((i) => ({
	src: `${config.manifestImagesPath}${config.baseName}-${i[0]}.${config.ext}`,
	type: `image/${config.ext}`,
	sizes: i.join('x'),
	purpose: 'maskable any',
}))

fs.writeFile(
	config.manifestJson,
	JSON.stringify(manifest),
	function writeJSON(err) {
		if (err) return console.log(err)
		console.log('Manifest JSON file modified!')
	},
)
