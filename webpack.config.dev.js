const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: 'development',
	entry: {
		CesiumNavigation: path.resolve(__dirname,'./viewerCesiumNavigationMixin.js')
	},
	output: {
		filename: "[name].js",
		library: {
			name: "[name]",
			type: "var",
		},
		// chunkFilename: '',
	},
	optimization: {
		concatenateModules: true,
		// minimize: true,
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /.*/,
					name: 'CesiumNavigation',
					chunks: 'all'
				}
			}
		}
	},
	devtool: true,
	plugins: [new NodePolyfillPlugin(),new MiniCssExtractPlugin()],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader,"css-loader"],
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
		]
	},
}
