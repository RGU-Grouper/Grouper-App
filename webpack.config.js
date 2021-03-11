const path = require('path');

module.exports = {
	entry: './client/src/main.js',
  output: {
		path: path.resolve(__dirname, 'client', 'dist', 'js'),
    filename: 'script.js'
  },
	mode: 'development',
	watch: true,
};

