// Modules
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const bot = require('../bot');
const botConfig = require('../bot/config')
const { Markup } = require('telegraf');
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

const botKeyboard = Markup.inlineKeyboard([
	[
		Markup.callbackButton('✅ Обработано', 'handled'),
		Markup.callbackButton('📞 Перезвонить позже', 'later')
	],
	[Markup.callbackButton('Взял в обработку 🤞', 'took')]
]).extra({ parse_mode: 'HTML' });

function mail(from) {
	return new Promise((resolve, reject) => {
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
				reject(err);
			} else {
				console.log('Email sent: ' + info.response);
				resolve();
			}
		});

		const messageForBot = (`<b>🔥 Новое сообщение на разработку</b>\n\n`) +
			(service ? `<b>Услуга:</b> ${service}\n` : '') +
			(option ? `<b>Тариф:</b> ${option}\n` : '') +
			(name ? `<b>Имя:</b> ${name}\n` : '') +
			(email ? `<b>Почта:</b> ${email}\n` : '') +
			(phone ? `<b>Номер:</b> ${phone}\n` : '') +
			(message ? `<b>Сообщение:</b> ${message}` : '');

		bot.telegram.sendMessage(botConfig.channelId, messageForBot, botKeyboard)
			.catch(err => {
				console.error('Error while sending lead to telegram channel:', err);
			});
	});
}

module.exports = mail;
