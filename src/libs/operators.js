// Modules
const { random, ceil } = Math;

// Config
const config = require('../../config/config');

// Constants
const RECALL_MESSAGE = 'Мы перезвоним вам утром';

function isWorkingTime() {
	const { from, till } = config.operators.time;
	const now = new Date();
	return now.getHours() >= from && now.getHours() < till;
}

function getOperators() {
	const { amount } = config.operators;
	const free = ceil(random() * (amount - 1));
	const busy = amount - free;
	const recallMessage = RECALL_MESSAGE;
	return isWorkingTime() 
		? { free, busy }
		: { recallMessage };
}

module.exports = { getOperators };