// Modules
const path = require('path');
const languageParser = require('accept-language-parser');
const sendFile = require('koa-sendfile');
const KoaRouter = require('@koa/router');

// Locals
const EN = require('../texts/en');
const RU = require('../texts/ru');
const UK = require('../texts/uk');

// Operators
const { getOperators } = require('../libs/operators');

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
	const operators = getOperators(contentLanguage);
	await ctx.render('index', { local, operators });
});

router.get('/en', async (ctx) => {
	// Set header
	const contentLanguage = 'en';
	ctx.set('Content-Language', contentLanguage);
	// Render page
	const local = EN;
	const operators = getOperators(contentLanguage);
	await ctx.render('index', { local, operators });
});

router.get('/ru', async (ctx) => {
	// Set header
	const contentLanguage = 'ru';
	ctx.set('Content-Language', contentLanguage);
	// Render page
	const local = RU;
	const operators = getOperators(contentLanguage);
	await ctx.render('index', { local, operators });
});

router.get('/uk', async (ctx) => {
	// Set header
	const contentLanguage = 'uk';
	ctx.set('Content-Language', contentLanguage);
	// Render page
	const local = UK;
	const operators = getOperators(contentLanguage);
	await ctx.render('index', { local, operators });
});

// Send mail
router.post('/mail', async (ctx) => {
	mail(ctx.request.body);
	ctx.redirect('/'); // Redirect to home page
});

// Exports
module.exports = router;
