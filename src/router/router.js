// Modules
const path = require('path');
const KoaRouter = require('@koa/router');

// Router
const router = new KoaRouter();

// Handlers
const {
	langSpecifiedHandler,
	langAndPathSpecifiedHandler,
	casesHandler,
	redirectHandler,
	mailHandler
} = require('../handlers/handlers');

/** HOME PAGE **/
// No page specified
router.get('/', langSpecifiedHandler);

// Redirect route
router.get('/redirect', redirectHandler);

// Special page specified
router.get('/:lang', langSpecifiedHandler);

// Special language and page specified
router.get('/:lang/:part', langAndPathSpecifiedHandler);

// Cases route
router.get('/:lang/:part/cases/:case', casesHandler);

// Send mail
router.post('/:lang/mail', mailHandler);

// Exports
module.exports = router;
