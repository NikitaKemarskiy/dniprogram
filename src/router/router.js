// Modules
const path = require('path');
const sendFile = require('koa-sendfile');
const KoaRouter = require('@koa/router');

// Mailer
const mail = require('../libs/mail');

// Router
const router = new KoaRouter();

// Constants
const STATIC_PATH = path.join(__dirname, '..', '..', 'public');

// Routes

// Home page
router.get('/', async (ctx) => {
	await sendFile(ctx, path.join(STATIC_PATH, 'index.html'));
});

// Send mail
router.post('/mail', async (ctx) => {
	mail(ctx.request.body);
	ctx.redirect('/'); // Redirect to home page
});

// Exports
module.exports = router;
