const { Scenes } = require("telegraf");

const { getToken } = require("../initDb");

const uploadFile = async (token, file) => {
  const response = await fetch(
    `http://${process.env.BACKEND_URL}/files/${file.file_name}`,
    {
      method: "POST",
      body: file.content,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": file.mime_type,
      },
    }
  );

  if (response.status === 201) {
    return response.json();
  }

  return null;
};

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
