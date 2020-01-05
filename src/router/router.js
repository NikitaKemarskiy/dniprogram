// Modules
const path = require('path');
const languageParser = require('accept-language-parser');
const sendFile = require('koa-sendfile');
const KoaRouter = require('@koa/router');

// Locals
const EN = require('../texts/en');
const RU = require('../texts/ru');
const UK = require('../texts/uk');

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
	// Get Accept-Language header
	const languages = languageParser.parse(ctx.request.headers['accept-language']);
	// Get Content-Language for response
	let contentLanguage = null;
	for (const language of languages) {
		if (SUPPORTED_LANGS.has(language.code)) {
			contentLanguage = language.code;
			break;
		}
	}
	// If Content-Language is undefined -> assign to "ru"
	contentLanguage = contentLanguage || 'ru';
	// Set header
	ctx.set('Content-Language', contentLanguage);
	// Render page
	const local = contentLanguage === 'en' ? EN :
				  contentLanguage === 'ru' ? RU :
				  contentLanguage === 'uk' ? UK : RU;
	const operators = {
		free: 1,
		busy: 1
	};
	await ctx.render('index', { local, operators });
});

// Send mail
router.post('/mail', async (ctx) => {
	mail(ctx.request.body);
	ctx.redirect('/'); // Redirect to home page
});

// Exports
module.exports = router;
