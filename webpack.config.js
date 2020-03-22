const path = require('path');
const ExtractTextPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
	const isProduction = env === 'production';
	//const CSSExtract = new ExtractTextPlugin('styles.css');


	return {
			entry: './src/app.js',
			output: {
				path: path.join(__dirname,'public'),
				filename: 'bundle.js'
			},
			module: {
				rules: [{
					loader: 'babel-loader',
					test: /\.js$/,
					exclude: /node_modules/
				},
				{

					test: /\.s?css$/,
					use: [
							ExtractTextPlugin.loader,
							{
								loader: 'css-loader',
								options: {
									sourceMap: true
								}
							},
							{
								loader: 'sass-loader',
								options: {
									sourceMap: true
								}
							}
						]
					
				}
				]
			},
			plugins:[
			new ExtractTextPlugin('main.css')
			],
			devtool: isProduction? 'source-map' : 'inline-source-map',
			devServer: {
				contentBase: path.join(__dirname, 'public'),
				historyApiFallback: true
			}
		};
};
