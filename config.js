const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "61RDCDiR#X3hhpp8CbLuWj_nWfPq3nTVdpKe2K6M4UJiEJ9NTtVs",
  OWNER_NUM: process.env.OWNER_NUM || "94711966305",
  PREFIX: process.env.PREFIX || ".",
  ALIVE_IMG: process.evn.ALIVE_IMG || "https://raw.githubusercontent.com/Dark-Robin/Bot-Helper/refs/heads/main/autoimage/Bot%20robin%20iz%20alive.jpg",
  ALIVE_MSG: process.evn.ALIVE_MSG || "Hello , I am alive now!!\n\n🥶𝐌𝐚𝐝𝐞 𝐛𝐲 V_I_H_A_G_A🥶",
  AUTO_READ_STATUS: process.evn.AUTO_READ_STATUS || "true",
  MODE: process.evn.MODE || "public",
};
