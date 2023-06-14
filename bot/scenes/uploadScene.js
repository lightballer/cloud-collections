const { Scenes } = require("telegraf");

const { getToken } = require("../initDb");
const { uploadFile } = require("../services/files.service");

const uploadScene = new Scenes.BaseScene("upload");

uploadScene.enter((ctx) => {
  ctx.reply("Send file to upload:");
});

uploadScene.on("document", async (ctx) => {
  const userId = ctx.from.id;
  const token = await getToken(userId);
  const file = ctx.message.document;
  try {
    const fileLink = await ctx.telegram.getFileLink(file.file_id);
    const fileBuffer = await fetch(fileLink).then((res) => res.arrayBuffer());
    const uploadResult = await uploadFile(token, {
      ...file,
      content: fileBuffer,
    });
    if (!uploadResult) return ctx.reply("Error while uploading file");
    ctx.reply("File successfully uploaded! 👍");
  } catch (err) {
    console.error(err);
    ctx.reply("Error while uploading file");
  }
});

module.exports = {
  uploadScene,
};
