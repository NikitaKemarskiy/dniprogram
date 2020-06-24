// Modules
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const { promisify } = require('util');

const appendFileAsync = promisify(fs.appendFile);

const MAIL_LOG_FILE = path.join(__dirname, '..', '..', 'logs', 'mail.log');

// Config
const config = require('../../config/config');

// Nodemailer transporter
const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: config.mailing,
	tls: {
		rejectUnauthorized: false
	}
});

function mail(from) {
	// Get params
	const {
		name,
		email,
		phone,
		message,
		service,
		option
	} = from;

	const html = (`<h3>Новое сообщение на разработку</h3><br>`) +
				 (service ? `<p>Услуга: <b>${service}</b><br>` : '') + 
				 (option ? `<p>Тариф: <b>${option}</b><br>` : '') + 
				 (name ? `<p>Имя: <b>${name}</b><br>` : '') + 
				 (email ? `<p>Почта: <b>${email}</b><br>` : '') + 
				 (phone ? `<p>Номер: <b>${phone}</b><br>` : '') +
				 (message ? `<p>Сообщение: ${message}` : '');

	fs.appendFile(MAIL_LOG_FILE, html + '\n\n\n', { flag: 'a' }, (err) => {
		if (err) {
			console.error(err);
		}
	});

	const options = {
		from: 'Сайт "Dniprogram"',
		to: config.mailing.user,
		subject: 'Новое сообщение!',
		html
	};

	transporter.sendMail(options, (err, info) => {
		if (err) {
			console.error(err);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}

module.exports = mail;
