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
const PRICING_PARTS = new Set([
	'businessCard',
	'chatbot',
	'corporate',
	'landing',
	'onlineStore'
]);
const CASES_PARTS = new Set([
	'chatbot',
	'onlineStore',
	'corporate',
	'landing',
	'businessCard'
]);
const PAGES = new Set([
	'about',
	'portfolio',
	'services',
	'chatbot',
	'website',
	'businessCard',
	'corporate',
	'landing',
	'onlineStore',
	'server',
	'desktop'
]);
const DEFAULT_PART = {
	info: 'home'
};

function getViewName(info) {
	if (PAGES.has(info)) {
		return info;
	}
	return 'index';
}

function getOtherLanguages(contentLanguage) {
	const otherLanguages = [];
	SUPPORTED_LANGS.forEach((language) => {
		if (contentLanguage === language) {
			return;
		}
		otherLanguages.push(language);
	});
	return otherLanguages;
}

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

	const otherLanguages = getOtherLanguages(contentLanguage);

	const part = DEFAULT_PART;

	await ctx.render(
		'index',
		{
			local,
			operators,
			part,
			contentLanguage,
			otherLanguages
		}
	);
}

async function langAndPathSpecifiedHandler(ctx) {
	// Get website content part
	// For example: home | onlineStore | landing etc.
	const info = ctx.params.part;
	const pricing = PRICING_PARTS.has(ctx.params.part)
					? ctx.params.part
					: null;
	const cases = CASES_PARTS.has(ctx.params.part)
					? ctx.params.part
					: null;
	const part = {
		info,
		pricing,
		cases
	};
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

	const otherLanguages = getOtherLanguages(contentLanguage);

	await ctx.render(
		getViewName(info),
		{
			local,
			operators,
			part,
			contentLanguage,
			otherLanguages
		}
	);
}

async function caseHandler(ctx) {
	// Get website content part
	// For example: home | onlineStore | landing etc.
	const service = ctx.params.part;
	// Get case name
	const caseName = ctx.params.case
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

	const otherLanguages = getOtherLanguages(contentLanguage);

	await ctx.render(`case`, {
		local,
		operators,
		service,
		caseName,
		contentLanguage,
		otherLanguages
	});
}

async function redirectHandler(ctx) {
	const { href } = ctx.query;
	if (!href || !href.startsWith('http')) {
		ctx.throw(404, 'Not found. Invalid link was set for redirect');
	}
	ctx.redirect(href);
}

async function mailHandler(ctx) {
	console.log('>>> Send a letter to email');
	console.dir(ctx.request.body);
	console.log('==========================');

	// Get language
	const contentLanguage = ctx.params.lang;
	// Mailing
	mail(ctx.request.body);
	// Redirect
	// ctx.redirect(ctx.request.body.redirectUrl || `/${contentLanguage}/home`); // Redirect to home page
}

module.exports = {
	langSpecifiedHandler,
	langAndPathSpecifiedHandler,
	caseHandler,
	redirectHandler,
	mailHandler
};