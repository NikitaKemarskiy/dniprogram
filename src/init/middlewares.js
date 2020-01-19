// Modules
const path = require('path');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const compress = require('koa-compress')
const ejs = require('koa-ejs');

// Router
const router = require(path.join(__dirname, '..', 'router', 'router'));

// Constants
const STATIC_PATH = path.join(__dirname, '..', '..', 'public');

// Middlewares init function
async function init(app) {
	// Redirect to HTTPS from HTTP
	app.use(async (ctx, next) => {
		if (ctx.secure) {
			await next();
		} else {
			const httpsPath = `https://${ctx.host}${ctx.url}`;
			ctx.redirect(httpsPath);
		}
	});

	// Body parser
	app.use(bodyParser());

	// Compression
	app.use(compress({
		threshold: 2048,
		flush: require('zlib').Z_SYNC_FLUSH
	}));

	// Static files
	app.use(static(STATIC_PATH, {
		index: '#' // # as a index file name to disable default static file
	}));

	// Routes
	app.use(router.routes());

	// Template engine
	ejs(app, {
		root: path.join(STATIC_PATH, 'views'),
		layout: false,
		viewExt: 'ejs',
		cache: false
	});

	console.log('>>> Middlewares were initialized!');
}

// Exports
module.exports = {
	init
};
