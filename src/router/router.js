// Modules
const path = require('path');
const sendFile = require('koa-sendfile');
const KoaRouter = require('@koa/router');

// Router
const router = new KoaRouter();

// Constants
const STATIC_PATH = path.join(__dirname, '..', '..', 'public');

// Routes
router.get('/', async(ctx) => {
	await sendFile(ctx, path.join(STATIC_PATH, 'index.html'));
});

// Exports
module.exports = router;
