const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    confirm: {
      import: './src/confirm.js',
      dependOn: ['jquery', 'bootstrap'],
    },
    icon: {
      import: './src/icon.js',
      dependOn: ['jquery', 'bootstrap'],
    },
    index: {
      import: './src/index.js',
      dependOn: ['jquery', 'bootstrap'],
    },
    login: {
      import: './src/login.js',
      dependOn: ['jquery', 'bootstrap'],
    },
    mypage: {
      import: './src/mypage.js',
      dependOn: ['jquery', 'bootstrap'],
    },
    plans: {
      import: './src/plans.js',
      dependOn: ['jquery', 'bootstrap'],
    },
    reserve: {
      import: './src/reserve.js',
      dependOn: ['jquery', 'popper', 'bootstrap', 'jqueryUi'],
    },
    signup: {
      import: './src/signup.js',
      dependOn: ['jquery', 'bootstrap'],
    },
    jquery: 'jquery',
    popper: 'popper.js',
    bootstrap: 'bootstrap',
    jqueryUi: 'jquery-ui',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'node_modules/bootstrap/dist/css/bootstrap.min.css',
          to: 'css/bootstrap.min.css',
        },
      ],
    }),
  ],
  devtool: 'source-map',
};
