const { Scenes } = require("telegraf");

const { saveToken, deleteToken } = require("../initDb");

const requestAuthToken = async (email, password) => {
  const response = await fetch(`http://${process.env.BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.status === 201) {
    const { access_token } = await response.json();
    return access_token;
  }

  return null;
};

const loginScene = new Scenes.BaseScene("login");

loginScene.enter((ctx) => {
  ctx.reply("Please enter your email:");
});

loginScene.on("text", async (ctx) => {
  const input = ctx.message.text;
  if (!ctx.session.email) {
    ctx.session.email = input;
    await ctx.reply("Please enter your password:");
  } else {
    ctx.session.password = input;
  }

  const { email, password } = ctx.session;

  if (!email || !password) return;

  const token = await requestAuthToken(email, password);

  if (token) {
    const userId = ctx.from.id;
    await deleteToken(userId);
    await saveToken(userId, token); // save token to local db
    await ctx.reply("You are logged in!");
  } else {
    ctx.session.email = undefined;
    ctx.session.password = undefined;
    await ctx.reply("Invalid email or password. Please try again. /login");
  }
  await ctx.scene.leave();
});

module.exports = { loginScene };
