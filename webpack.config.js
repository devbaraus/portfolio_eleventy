const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
	entry: './src/_bundle/main.js',
	mode: process.env.NODE_ENV,
	module: {
		rules: [
			{
				test: /\.pcss$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
			},
			{
				test: /\.font\.js/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							url: false,
						},
					},
					'webfonts-loader',
				],
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [
			// For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
			// `...`,
			new CSSMinimizerPlugin(),
			new TerserPlugin(),
		],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/main.js',
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/main.css',
		}),
	],
}
