const { Scenes } = require("telegraf");
const { getToken } = require("../initDb");
const COMMANDS = require("../commands");

const getFilesList = async (token) => {
  const response = await fetch(`http://${process.env.BACKEND_URL}/files`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return response.json();
  }

  return null;
};

const getRawFile = async (token, id) => {
  const response = await fetch(
    `http://${process.env.BACKEND_URL}/files/${id}/raw`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status === 200) {
    const headerValue = response.headers.get("content-disposition");
    const filename = headerValue.substring(
      headerValue.indexOf(`"`) + 1,
      headerValue.lastIndexOf(`"`)
    );
    const arrayBuffer = await response.arrayBuffer();
    return arrayBuffer;
  }

  return null;
};

const getFileInfo = async (token, id) => {
  const response = await fetch(
    `http://${process.env.BACKEND_URL}/files/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status === 200) {
    return response.json();
  }

  return null;
};

const downloadScene = new Scenes.BaseScene("download");

downloadScene.enter(async (ctx) => {
  const userId = ctx.from.id;
  const token = await getToken(userId);
  if (!token) return ctx.reply("Unauthorized!");
  const files = await getFilesList(token);
  if (files) {
    const filesToString = files
      .map((file) => `${file.id} - ${file.name}`)
      .join("\n");
    await ctx.reply(`Send file id to get it:\n${filesToString}`);
  } else {
    return ctx.reply("Unauthorized!");
  }
});

downloadScene.on("text", async (ctx) => {
  const input = ctx.message.text;

  if (COMMANDS.includes[input]) return ctx.scene.leave();
  const userId = ctx.from.id;
  const token = await getToken(userId);

  try {
    const { name } = await getFileInfo(token, input);

    const arrayBuffer = await getRawFile(token, input);
    if (arrayBuffer === null) {
      await ctx.reply("Unauthorized!");
      await ctx.scene.leave();
    }
    const buffer = Buffer.from(arrayBuffer);
    await ctx.replyWithDocument({ source: buffer, filename: name });
  } catch (err) {
    console.error(err);
    await ctx.reply("Error while getting file");
    await ctx.scene.leave();
  }
});

module.exports = {
  downloadScene,
};
