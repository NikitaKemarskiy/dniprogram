// Modules
const languageParser = require('accept-language-parser');
const sendFile = require('koa-sendfile');

// Operators
const { getOperators } = require('../libs/operators');

// Mailer
const mail = require('../libs/mail');

// Locals
const EN = require('../texts/en');
const RU = require('../texts/ru');
const UK = require('../texts/uk');

// Constants
const SUPPORTED_LANGS = new Set(['en', 'ru', 'uk']);
const DEFAULT_PART = 'home';

// Handlers
async function langSpecifiedHandler(ctx) {
	let contentLanguage = ctx.params.lang;
	if (!contentLanguage) {
		// Get Accept-Language header
		const languages = languageParser.parse(ctx.request.headers['accept-language']);
		// Get Content-Language for response
		for (const language of languages) {
			if (SUPPORTED_LANGS.has(language.code)) {
				contentLanguage = language.code;
				break;
			}
		}
		// If Content-Language is undefined -> assign to "ru"
		contentLanguage = contentLanguage || 'ru';
	} else if (!SUPPORTED_LANGS.has(contentLanguage)) {
		ctx.throw(404, 'Not found. Invalid language was set');
	}
	// Set header
	ctx.set('Content-Language', contentLanguage);
	// Render page
	const local = contentLanguage === 'en' ? EN :
				  contentLanguage === 'ru' ? RU :
				  contentLanguage === 'uk' ? UK : RU;
	const operators = getOperators(contentLanguage);
	const part = DEFAULT_PART;
	await ctx.render('index', { local, operators, part, contentLanguage });
}

async function langAndPathSpecifiedHandler(ctx) {
	// Get website content part
	// For example: home | onlineStore | landing etc.
	const part = ctx.params.part;
	// Get language
	const contentLanguage = ctx.params.lang;
	// Check whether language is valid
	if (!SUPPORTED_LANGS.has(contentLanguage)) {
		ctx.throw(404, 'Not found. Invalid language was set');
	}
	// Set header
	ctx.set('Content-Language', contentLanguage);
	// Render page
	const local = contentLanguage === 'en' ? EN :
				  contentLanguage === 'ru' ? RU :
				  contentLanguage === 'uk' ? UK : RU;
	const operators = getOperators(contentLanguage);
	await ctx.render('index', { local, operators, part, contentLanguage });
}

async function mailHandler(ctx) {
	mail(ctx.request.body);
	ctx.redirect('/home'); // Redirect to home page
}

module.exports = {
	langSpecifiedHandler,
	langAndPathSpecifiedHandler,
	mailHandler
};