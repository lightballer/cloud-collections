const { Telegraf, session, Scenes } = require("telegraf");
const { SQLite } = require("@telegraf/session/sqlite");

const { loginScene } = require("./loginScene");

const TOKEN = process.env.BOT_TOKEN;

const bot = new Telegraf(TOKEN);

const stage = new Scenes.Stage([loginScene]);
bot.use(session());
bot.use(stage.middleware());

bot.command("login", (ctx) => ctx.scene.enter("login"));
bot.start((ctx) =>
  ctx.reply(
    "Welcome to Cloud Collections!\nType /login to log in to system, /upload to upload file, /download to get file"
  )
);

bot.launch();
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

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

// const store = SQLite({
//   filename: "./telegraf-sessions.sqlite",
// });
