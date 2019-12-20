// Write env variables values to constants
const MAIL_USER = process.env.MAIL_USER; // Email username to log in
const MAIL_PASS = process.env.MAIL_PASS; // Email password to log in
const SSL_PATH = process.env.SSL_PATH; // Path to SSL certificates
const NODE_ENV = process.env.NODE_ENV; // Environment type (development / production)

// Check if mail auth environment variables are specified
if (!MAIL_USER || !MAIL_PASS || !SSL_PATH) {
	console.error(`XXX Error: MAIL_USER | MAIL_PASS | SSL_PATH isn't specified`);
	process.exit(1);
}

const config = {
	prod: { // Production config
		ssl: {
			keyPath: SSL_PATH + 'privkey.pem',
			certPath: SSL_PATH + 'cert.pem',
			chainPath: SSL_PATH + 'chain.pem'
		},
		mailing: {
			user: MAIL_USER,
			pass: MAIL_PASS
		}	
	},
	dev: { // Development config
		ssl: {
			keyPath: SSL_PATH + 'privkey.pem',
			certPath: SSL_PATH + 'cert.pem',
			chainPath: SSL_PATH + 'chain.pem'
		},
		mailing: {
			user: MAIL_USER,
			pass: MAIL_PASS
		}
	}
}

// Export config according to NODE_ENV variable
module.exports = NODE_ENV === 'production' ? config.prod : config.dev;