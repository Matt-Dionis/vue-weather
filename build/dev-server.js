'use strict';

require('./check-versions')();

const config = require('../config');
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const opn = require('opn');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf');

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port;
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable;

const app = express();
const compiler = webpack(webpackConfig);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const googleMapsClient = require('@google/maps').createClient({
  key: config.dev.googleMaps.key
});

let locations = [];

function getIndex(id) {
  return locations.findIndex(location => location.id === id);
}

app.get('/api/locations', (req, res) => {
  res.json(locations);
});

app.post('/api/locations', (req, res) => {
  let newLocation = req.body.location;
  const maxId = Math.max.apply(Math, locations.map(location => location.id));
  newLocation.id = locations.length === 0 ? "1" : (maxId + 1).toString();
  locations.push(newLocation);
  const index = locations.length - 1;
  if (locations[index].favorite) {
    locations.forEach(location => {
      if (location.id !== newLocation.id) {
        location.favorite = false;
      } else {
        location.favorite = true;
      }
    });
  } else {
    locations[index].favorite = false;
  }

  googleMapsClient.geocode({
    address: newLocation.name
  }, (err, geoResponse) => {
    if (err) {
      console.log(err);
    }
    const lat = geoResponse.json.results[0].geometry.location.lat;
    const lng = geoResponse.json.results[0].geometry.location.lng;
    request(`${config.dev.darkSky.root}${config.dev.darkSky.key}/${lat},${lng}${config.dev.darkSky.params}`, (err, response, body) => {
      locations[index].weather = JSON.parse(body);
      res.json(locations[index]);
    });
  });
});

app.put('/api/locations/:id/favorite', (req, res) => {
  const index = getIndex(req.params.id);
  locations.forEach(location => {
    if (location.id !== req.params.id) {
      location.favorite = false;
    } else {
      location.favorite = true;
    }
  });
  res.json(locations);
});

app.delete('/api/locations/:id', (req, res) => {
  const index = getIndex(req.params.id);
  locations.splice(index, 1);
  res.json(locations);
});

app.get('/api/locations/:id', (req, res) => {
  const index = getIndex(req.params.id);
  googleMapsClient.geocode({
    address: locations[index].name
  }, (err, geoResponse) => {
    if (err) {
      console.log(err);
    }
    const lat = geoResponse.json.results[0].geometry.location.lat;
    const lng = geoResponse.json.results[0].geometry.location.lng;
    request(`${config.dev.darkSky.root}${config.dev.darkSky.key}/${lat},${lng}${config.dev.darkSky.params}`, (err, response, body) => {
      locations[index].weather = JSON.parse(body);
      res.json(locations[index]);
    });
  });
});

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
});
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', compilation => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

// proxy api requests
Object.keys(proxyTable).forEach(context => {
  let options = proxyTable[context];
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options));
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

const uri = `http://localhost:${port}`;

let _resolve;
const readyPromise = new Promise(resolve => {
  _resolve = resolve
});

console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
});

const server = app.listen(port);

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
};
