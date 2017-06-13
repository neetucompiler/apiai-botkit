var Botkit = require('botkit');
var apiai = require('botkit-middleware-apiai')({
    token: process.env.API_AI_TOKEN,
    skip_bot: false
});

console.log(apiai);

var controller = Botkit.facebookbot({
    debug: true,
    access_token: process.env.FB_PAGE_TOKEN,
    verify_token: process.env.VERIFY_TOKEN,
});

var bot = controller.spawn({
});

controller.setupWebserver(process.env.port || 3000, function(err, webserver) {
    controller.createWebhookEndpoints(webserver, bot, function() {
        console.log('ONLINE!');
    });
});

controller.middleware.receive.use(apiai.receive);

controller.hears(['hello'], ['message_received'], apiai.hears, function(bot, message) {
    console.log(JSON.stringify(message));
    console.log('hello');
    bot.reply(message, 'Hello!');
});

