const config = {
	dev: {
		token: '',
		channelId: ''
	},
	prod: {
		token: '',
		channelId: ''
	}
};

module.exports = process.env.NODE_ENV === 'production' ? config.prod : config.dev;
