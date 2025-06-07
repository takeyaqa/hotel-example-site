const path = require('node:path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    confirm: './src/confirm.js',
    icon: './src/icon.js',
    index: './src/index.js',
    login: './src/login.js',
    mypage: './src/mypage.js',
    plans: './src/plans.js',
    reserve: './src/reserve.js',
    signup: './src/signup.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'node_modules/bootstrap/dist/css/bootstrap.min.css',
          to: 'css/bootstrap.min.css',
        },
        {
          from: 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
          to: 'vendor/bootstrap.bundle.min.js',
        },
        {
          from: 'node_modules/jquery/dist/jquery.min.js',
          to: 'vendor/jquery.min.js',
        },
        {
          from: 'node_modules/jquery-ui/dist/themes/base/jquery-ui.min.css',
          to: 'css/jquery-ui.min.css',
        },
        {
          from: 'node_modules/jquery-ui/dist/themes/base/images/*.png',
          to: 'css/images/[name].png',
        },
        {
          from: 'node_modules/jquery-ui/dist/jquery-ui.min.js',
          to: 'vendor/jquery-ui.min.js',
        },
        {
          from: 'node_modules/jquery-ui/ui/i18n/datepicker-ja.js',
          to: 'vendor/datepicker-ja.js',
        },
      ],
    }),
  ],
};
