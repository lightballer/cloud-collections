const { Telegraf, session } = require("telegraf");
const { message } = require("telegraf/filters");
const { SQLite } = require("@telegraf/session/sqlite");
const { Stage } = require("telegraf/typings/scenes");

const TOKEN = process.env.BOT_TOKEN;

const store = SQLite({
  filename: "./telegraf-sessions.sqlite",
});

const bot = new Telegraf(TOKEN);

bot.hears('login', ctx => {
    ctx.reply('Please enter your username:');
});

bot.on('text', ctx => {
    ctx.
})

// bot.use(session({ store }));

// Create a new stage
// const loginStage = new Stage();

// Define the login scene

// bot.use(loginStage.middleware());

// bot.start((ctx) => ctx.reply("Welcome"));
// bot.help((ctx) => ctx.reply("Send me a sticker"));
// bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
// bot.hears("hi", (ctx) => ctx.reply("Hey there"));
// bot.hears('/download', (ctx) => ctx.reply());

bot.launch();
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
