const { Scenes } = require("telegraf");

const { saveToken, deleteToken } = require("../initDb");
const { requestAuthToken } = require("../services/auth.service");

const loginScene = new Scenes.BaseScene("login");

loginScene.enter((ctx) => {
  ctx.reply("Please enter your email:");
});

loginScene.on("text", async (ctx) => {
  const input = ctx.message.text;
  const id = ctx.message.message_id;
  if (!ctx.session.email) {
    ctx.session.email = { input, id };
    await ctx.reply("Please enter your password:");
    ctx.session.prompts = [ctx.message.message_id];
  } else {
    ctx.session.password = { input, id };
  }

  const email = ctx.session?.email?.input;
  const password = ctx.session?.password?.input;

  if (!email || !password) return;

  const token = await requestAuthToken(email, password);

  if (token) {
    const userId = ctx.from.id;
    await deleteToken(userId);
    await saveToken(userId, token);
    await ctx.reply("You are logged in!");
    await ctx.deleteMessage(ctx.session.email.id);
    await ctx.deleteMessage(ctx.session.password.id);
  } else {
    await ctx.reply("Invalid email or password. Please try again. /login");
    await ctx.deleteMessage(ctx.session.email.id);
    await ctx.deleteMessage(ctx.session.password.id);
    ctx.session.email = undefined;
    ctx.session.password = undefined;
  }
  ctx.scene.leave();
});

module.exports = { loginScene };
