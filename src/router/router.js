// Modules
const path = require('path');
const languageParser = require('accept-language-parser');
const sendFile = require('koa-sendfile');
const KoaRouter = require('@koa/router');

// Mailer
const mail = require('../libs/mail');

// Router
const router = new KoaRouter();

// Constants
const STATIC_PATH = path.join(__dirname, '..', '..', 'public');
const SUPPORTED_LANGS = new Set(['en', 'ru', 'uk']);

// Routes

// Home page
router.get('/', async (ctx) => {
	const languages = languageParser.parse(ctx.request.headers['accept-language']);
	let contentLanguage = null;
	// Get Content-Language for response
	for (const language of languages) {
		if (SUPPORTED_LANGS.has(language.code)) {
			contentLanguage = language.code;
			break;
		}
	}
	// If Content-Language is undefined -> assign to "ru"
	contentLanguage = contentLanguage || 'ru';
	ctx.set('Content-Language', contentLanguage);
	await sendFile(ctx, path.join(STATIC_PATH, 'html', contentLanguage, 'index.html'));
});

// Send mail
router.post('/mail', async (ctx) => {
	mail(ctx.request.body);
	ctx.redirect('/'); // Redirect to home page
});

// Exports
module.exports = router;
