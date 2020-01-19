// Modules
const path = require('path');
const KoaRouter = require('@koa/router');

// Router
const router = new KoaRouter();

// Handlers
const {
	pathSpecifiedHandler,
	pathAndLangSpecifiedHandler,
	mailHandler
} = require('../handlers/handlers');

/** HOME PAGE **/
// No page specified
router.get('/', pathSpecifiedHandler);
// Special page specified
router.get('/:part', pathSpecifiedHandler);
// Special language and page specified
router.get('/:part/:lang', pathAndLangSpecifiedHandler);

// Send mail
router.post('/mail', mailHandler);

// Exports
module.exports = router;
