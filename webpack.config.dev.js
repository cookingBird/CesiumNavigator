const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	// devtools: 'none',
	entry: {
		CesiumNavigation: path.resolve(__dirname, './viewerCesiumNavigationMixin.js'),
	},
	output: {
		publicPath: './',
		path: path.resolve(__dirname, './Build'),
		filename: '[name].js',
		library: {
			name: '[name]',
			type: 'umd',
			export: 'default',
		},
		// globalObject: 'window',//default 'self'
		scriptType: 'text/javascript',
	},
	optimization: {
		concatenateModules: true,
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
	},
	// plugins: [new NodePolyfillPlugin(), new MiniCssExtractPlugin()],
	plugins: [new MiniCssExtractPlugin()],
	resolve: {
		extensions: ['.js', 'cjs', '.css'],
		fallback: {
			'http': false,
			'zlib': false,
			'https': false,
		},
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
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
		],
	},
};
