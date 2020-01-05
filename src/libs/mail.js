// Modules
const nodemailer = require('nodemailer');

// Config
const config = require('../../config/config');

console.dir(config.mailing);

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
	const { name, email, phone, message } = from;

	const html = (`<h3>Новое сообщение на разработку</h3><br>`) +
				 (name ? `<p>Имя: <b>${name}</b><br>` : '') + 
				 (email ? `<p>Почта: <b>${email}</b><br>` : '') + 
				 (phone ? `<p>Номер: <b>${phone}</b><br>` : '') +
				 (message ? `<p>Сообщение: ${message}` : '');

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
