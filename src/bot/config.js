const BOT_DEV_TOKEN = process.env.BOT_DEV_TOKEN;
const BOT_DEV_CHANNEL_ID = process.env.BOT_DEV_CHANNEL_ID;
const BOT_TOKEN = process.env.BOT_TOKEN;
const BOT_CHANNEL_ID = process.env.BOT_CHANNEL_ID;

const config = {
	dev: {
		token: BOT_DEV_TOKEN,
		channelId: BOT_DEV_CHANNEL_ID
	},
	prod: {
		token: BOT_TOKEN,
		channelId: BOT_CHANNEL_ID
	}
};

module.exports = NODE_ENV === 'production' ? config.prod : config.dev;