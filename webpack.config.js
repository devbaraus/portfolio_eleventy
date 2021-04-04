const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
	entry: './src/_bundle/main.js',
	mode: process.env.NODE_ENV || 'development',
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
		usedExports: true,
		minimizer: [new CSSMinimizerPlugin(), new TerserPlugin()],
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
