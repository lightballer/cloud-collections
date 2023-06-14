const { Telegraf, session, Scenes } = require("telegraf");

const { db } = require("./initDb");

const { loginScene } = require("./scenes/loginScene");
const { downloadScene } = require("./scenes/downloadScene");
const { uploadScene } = require("./scenes/uploadScene");

const TOKEN = process.env.BOT_TOKEN;

const bot = new Telegraf(TOKEN);

const stage = new Scenes.Stage([loginScene, downloadScene, uploadScene]);
bot.use(session());
bot.use(stage.middleware());

bot.use((ctx, next) => {
  ctx.scene.leave();
  return next();
});

bot.command("login", (ctx) => ctx.scene.enter("login"));
bot.command("download", (ctx) => ctx.scene.enter("download"));
bot.command("upload", (ctx) => ctx.scene.enter("upload"));

bot.start((ctx) =>
  ctx.reply(
    "Welcome to Cloud Collections!\nType /login to log in to system, /upload to upload file, /download to get file"
  )
);

bot.launch();

process.once("SIGINT", () => {
  bot.stop("SIGINT");
  db.close();
});
process.once("SIGTERM", () => {
  bot.stop("SIGTERM");
  db.close();
});

module.exports = { bot };
