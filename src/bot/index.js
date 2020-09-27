const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');

const config = require('../bot/config');

const bot = new Telegraf(config.token);

bot.start(async ctx => {
	await ctx.reply('Я работаю!');
});

bot.on('message', async ctx => {
	console.log(ctx.message.forward_from_chat)
})

bot.action('handled', async ctx => {
	await ctx.editMessageText('🔴 <b>Обработано</b>\n\n' + ctx.update.callback_query.message.text, {
		parse_mode: 'HTML'
	});
});

bot.action('later', async ctx => {
	await ctx.editMessageText('📞 <b>Перезвонить</b>\n\n' + ctx.update.callback_query.message.text, Markup.inlineKeyboard([
		Markup.callbackButton('✅ Обработано', 'handled')
	]).extra({ parse_mode: 'HTML' }));
});

bot.action('took', async ctx => {
	await ctx.editMessageText('🤞 <b>В обработке</b>\n\n' + ctx.update.callback_query.message.text, Markup.inlineKeyboard([
		Markup.callbackButton('✅ Обработано', 'handled'),
		Markup.callbackButton('📞 Перезвонить', 'later')
	]).extra({ parse_mode: 'HTML' }));
});

bot.launch()
	.catch(err => {
		console.error('Unable to start bot:', err);
	});

bot.catch(err => console.error('Error in bot:', err));

module.exports = bot;
