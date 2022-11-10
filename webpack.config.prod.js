const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
module.exports = {
	mode: 'production',
	entry: {
		CesiumNavigation: path.resolve(__dirname,'./viewerCesiumNavigationMixin.js')
	},
	output: {
		filename: "[name].min.js",
		library: {
			name: "[name]",
			type: "var",
		},
		scriptType: 'text/javascript'
	},
	optimization: {
		concatenateModules: true,
		minimize: true,
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
	devtool: false,
	plugins: [new NodePolyfillPlugin()],
	module: {
		rules: [
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
			{
				test: /\.less$/i,
				use: [
					// compiles Less to CSS
					"style-loader",
					"css-loader",
					"less-loader",
				],
			},
			{
				test: /\.css$/i,
				use: ["style-loader","css-loader"],
			},
		]
	}
}
