// Modules
const path = require('path');
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');

// Router
const router = require(path.join(__dirname, '..', 'router', 'router'));

// Constants
const STATIC_PATH = path.join(__dirname, '..', '..', 'public');

// Middlewares init function
async function init(app) {
	// Middlewares
	app.use(bodyParser()); // Body parser
	app.use(koaStatic(STATIC_PATH));
	app.use(async (ctx, next) => { // Redirect to HTTPS from HTTP
		if (ctx.secure) {
			await next();
		} else {
			const httpsPath = `https://${ctx.host}${ctx.url}`;
			ctx.redirect(httpsPath);
		}
	});

	// Routes
	app.use(router.routes());

	console.log('>>> Middlewares were initialized!');
}

// Exports
module.exports = {
	init
};
