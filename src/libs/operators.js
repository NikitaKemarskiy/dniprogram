// Modules
const { random, ceil } = Math;

// Config
const config = require('../../config/config');

// Constants
const RECALL_MESSAGE = {
	EN: 'You contacted after hours. We will call you back in the morning.',
	RU: 'Вы обратились в нерабочее время. Мы перезвоним вам утром',
	UK: 'Ви звернулися в неробочий час. Ми передзвонимо вам вранці'
};

function isWorkingTime() {
	const { from, till } = config.operators.time;
	const now = new Date();
	return now.getHours() >= from && now.getHours() < till;
}

function getOperators(contentLanguage) {
	// Operators amount
	const { amount } = config.operators;
	const free = ceil(random() * (amount - 1));
	const busy = amount - free;
	// Recall message
	const recallMessage = contentLanguage === 'en' ? RECALL_MESSAGE.EN :
						  contentLanguage === 'ru' ? RECALL_MESSAGE.RU :
						  contentLanguage === 'uk' ? RECALL_MESSAGE.UK : RECALL_MESSAGE.RU;
	return isWorkingTime() 
		? { free, busy }
		: { recallMessage };
}

module.exports = { getOperators };