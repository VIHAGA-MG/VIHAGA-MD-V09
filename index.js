const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  getContentType,
  fetchLatestBaileysVersion,
  Browsers,
} = require("@whiskeysockets/baileys");

const l = console.log;
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson,
} = require("./lib/functions");
const fs = require("fs");
const P = require("pino");
const config = require("./config");
const qrcode = require("qrcode-terminal");
const util = require("util");
const { sms, downloadMediaMessage } = require("./lib/msg");
const axios = require("axios");
const { File } = require("megajs");
const prefix = config.PREFIX;
const ownerNumber = config.OWNER_NUM;

if (!fs.existsSync(__dirname + "/auth_info_baileys/creds.json")) {
  if (!config.SESSION_ID)
    return console.log("Please add your session to SESSION_ID env !!");

  try {
    const sessdata = config.SESSION_ID;
    const filer = File.fromURL(`https://mega.nz/file/${sessdata}`);
    filer.download((err, data) => {
      if (err) {
        console.error("MEGA Download Error:", err);
        return;
      }
      fs.writeFile(__dirname + "/auth_info_baileys/creds.json", data, () => {
        console.log("Session downloaded ✅");
      });
    });
  } catch (e) {
    console.error("Session Download Failed:", e);
  }
}

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

async function connectToWA() {
  console.log("Connecting VIHAGA-MD");
  const { state, saveCreds } = await useMultiFileAuthState(
    __dirname + "/auth_info_baileys/"
  );
  const { version } = await fetchLatestBaileysVersion();

  const robin = makeWASocket({
    logger: P({ level: "silent" }),
    printQRInTerminal: false,
    browser: Browsers.macOS("Firefox"),
    syncFullHistory: true,
    auth: state,
    version,
  });

  robin.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      if (
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
      ) {
        connectToWA();
      }
    } else if (connection === "open") {
      console.log(" Installing... ");
      const path = require("path");
      fs.readdirSync("./plugins/").forEach((plugin) => {
        if (path.extname(plugin).toLowerCase() == ".js") {
          delete require.cache[require.resolve("./plugins/" + plugin)];
          require("./plugins/" + plugin);
        }
      });
      console.log("❤️VIHAGA-MD❤️ installed successful ✅");
      console.log("❤️VIHAGA-MD❤️ connected to whatsapp ✅");

      const up = `❤️VIHAGA-MD❤️ connected successful ✅`;
      const up1 = `Hello VIHAGA-MD, I made bot successful`;

      robin.sendMessage(ownerNumber + "@s.whatsapp.net", {
        image: {
          url: `https://raw.githubusercontent.com/Dark-Robin/Bot-Helper/refs/heads/main/autoimage/Bot%20robin%20cs.jpg`,
        },
        caption: up,
      });
      robin.sendMessage("94711966305@s.whatsapp.net", {
        image: {
          url: `https://raw.githubusercontent.com/Dark-Robin/Bot-Helper/refs/heads/main/autoimage/Bot%20robin%20cs.jpg`,
        },
        caption: up1,
      });
    }
  });

  robin.ev.on("creds.update", saveCreds);

  robin.ev.on("messages.upsert", async (mek) => {
    mek = mek.messages[0];
    if (!mek.message) return;
    mek.message =
      getContentType(mek.message) === "ephemeralMessage"
        ? mek.message.ephemeralMessage.message
        : mek.message;

    if (
      mek.key &&
      mek.key.remoteJid === "status@broadcast" &&
      config.AUTO_READ_STATUS === "true"
    ) {
      await robin.readMessages([mek.key]);
    }

    const m = sms(robin, mek);
    const type = getContentType(mek.message);
    const body =
      type === "conversation"
        ? mek.message.conversation
        : type === "extendedTextMessage"
        ? mek.message.extendedTextMessage.text
        : type === "imageMessage" && mek.message.imageMessage.caption
        ? mek.message.imageMessage.caption
        : type === "videoMessage" && mek.message.videoMessage.caption
        ? mek.message.videoMessage.caption
        : "";

    const isCmd = body.startsWith(prefix);
    const command = isCmd ? body.slice(prefix.length).trim().split(" ").shift().toLowerCase() : "";
    const args = body.trim().split(/ +/).slice(1);
    const q = args.join(" ");
    const from = mek.key.remoteJid;
    const isGroup = from.endsWith("@g.us");
    const sender = mek.key.fromMe
      ? robin.user.id.split(":"[0]) + "@s.whatsapp.net"
      : mek.key.participant || mek.key.remoteJid;
    const senderNumber = sender.split("@")[0];
    const botNumber = robin.user.id.split(":"[0]);
    const pushname = mek.pushName || "Sin Nombre";
    const isMe = botNumber.includes(senderNumber);
    const isOwner = ownerNumber.includes(senderNumber) || isMe;
    const botNumber2 = await jidNormalizedUser(robin.user.id);
    const groupMetadata = isGroup ? await robin.groupMetadata(from).catch(() => {}) : "";
    const groupName = isGroup ? groupMetadata.subject : "";
    const participants = isGroup ? groupMetadata.participants : "";
    const groupAdmins = isGroup ? await getGroupAdmins(participants) : "";
    const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false;
    const isAdmins = isGroup ? groupAdmins.includes(sender) : false;
    const isReact = m.message.reactionMessage ? true : false;

    const reply = (teks) => {
      robin.sendMessage(from, { text: teks }, { quoted: mek });
    };

    robin.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
      let mime = "";
      let res = await axios.head(url);
      mime = res.headers["content-type"];

      const buffer = await getBuffer(url);
      const mediaType = mime.split("/")[0];

      if (mime === "application/pdf") {
        return robin.sendMessage(jid, {
          document: buffer,
          mimetype: "application/pdf",
          caption,
          ...options,
        }, { quoted, ...options });
      } else if (mediaType === "image") {
        return robin.sendMessage(jid, {
          image: buffer,
          caption,
          ...options,
        }, { quoted, ...options });
      } else if (mediaType === "video") {
        return robin.sendMessage(jid, {
          video: buffer,
          caption,
          mimetype: "video/mp4",
          ...options,
        }, { quoted, ...options });
      } else if (mediaType === "audio") {
        return robin.sendMessage(jid, {
          audio: buffer,
          caption,
          mimetype: "audio/mpeg",
          ...options,
        }, { quoted, ...options });
      }
    };

    if (senderNumber.includes("94711966305") && isReact) return;

    if (!isOwner && config.MODE === "private") return;
    if (!isOwner && isGroup && config.MODE === "inbox") return;
    if (!isOwner && !isGroup && config.MODE === "groups") return;

    const events = require("./command");
    const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;

    if (isCmd) {
      const cmd =
        events.commands.find((cmd) => cmd.pattern === cmdName) ||
        events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName));

      if (cmd) {
        if (cmd.react)
          robin.sendMessage(from, { react: { text: cmd.react, key: mek.key } });

        try {
          cmd.function(robin, mek, m, {
            from, quoted, body, isCmd, command, args, q,
            isGroup, sender, senderNumber, botNumber2, botNumber,
            pushname, isMe, isOwner, groupMetadata, groupName,
            participants, groupAdmins, isBotAdmins, isAdmins, reply,
          });
        } catch (e) {
          console.error("[PLUGIN ERROR]", e);
          reply(`❌ Command Error: ${e.message}`);
        }
      }
    }

    for (const command of events.commands) {
      const triggers = ["body", "text", "image", "photo", "sticker"];
      if (!triggers.includes(command.on)) continue;

      const isTriggered =
        (command.on === "body" && body) ||
        (command.on === "text" && mek.q) ||
        (command.on === "image" && mek.type === "imageMessage") ||
        (command.on === "photo" && mek.type === "imageMessage") ||
        (command.on === "sticker" && mek.type === "stickerMessage");

      if (isTriggered) {
        command.function(robin, mek, m, {
          from, l, quoted, body, isCmd, command, args, q,
          isGroup, sender, senderNumber, botNumber2, botNumber,
          pushname, isMe, isOwner, groupMetadata, groupName,
          participants, groupAdmins, isBotAdmins, isAdmins, reply,
        });
      }
    }
  });
}

app.get("/", (req, res) => {
  res.send("hey, ❤️VIHAGA-MD❤️ started✅");
});

app.listen(port, () =>
  console.log(`Server listening on port http://localhost:${port}`)
);

setTimeout(() => {
  connectToWA();
}, 4000);
