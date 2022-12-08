const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
	mode: 'production',
	entry: {
		CesiumNavigation: path.resolve(__dirname, './viewerCesiumNavigationMixin.js'),
	},
	output: {
		publicPath: './',
		filename: '[name].min.js',
		library: {
			name: '[name]',
			type: 'umd',
			export: 'default',
		},
		scriptType: 'text/javascript',
	},
	optimization: {
		concatenateModules: true,
		minimize: true,
		splitChunks: {
			cacheGroups: {
				vendors: {
					// test: /[\\/]mode_modules[\\/]/,
					test: /.*/,
					name: 'CesiumNavigation',
					chunks: 'all',
				},
			},
		},
		removeEmptyChunks: true,
	},
	devtool: false,
	resolve: {
		extensions: ['.js', 'cjs', '.css'],
		fallback: {
			'http': false,
			'zlib': false,
			'https': false,
		},
	},
	plugins: [new MiniCssExtractPlugin()],
	// plugins: [new NodePolyfillPlugin(), new MiniCssExtractPlugin()],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},
};
