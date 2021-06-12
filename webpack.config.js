const webpack = require('webpack');
require('dotenv').config();

const config = {
  entry: ['./client/index.jsx'],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_API_KEY: JSON.stringify(process.env.REACT_APP_API_KEY),
        REACT_APP_AUTH_DOMAIN: JSON.stringify(
          process.env.REACT_APP_AUTH_DOMAIN
        ),
        REACT_APP_PROJECT_ID: JSON.stringify(process.env.REACT_APP_PROJECT_ID),
        REACT_APP_STORAGE_BUCKET: JSON.stringify(
          process.env.REACT_APP_STORAGE_BUCKET
        ),
        REACT_APP_MESSAGING_SENDER_ID: JSON.stringify(
          process.env.REACT_APP_MESSAGING_SENDER_ID
        ),
        REACT_APP_APP_ID: JSON.stringify(process.env.REACT_APP_APP_ID),
        REACT_APP_MEASUREMENT_ID: JSON.stringify(
          process.env.REACT_APP_MEASUREMENT_ID
        ),
      },
    }),
  ],
};

module.exports = config;
