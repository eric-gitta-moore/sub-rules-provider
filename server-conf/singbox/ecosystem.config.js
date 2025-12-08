require("@dotenvx/dotenvx").config();

const cwd = __dirname;

module.exports = {
  apps: [
    {
      name: "caddy",
      script: "caddy",
      args: "run --environ",
      interpreter: "none",
      cwd,
    },
    {
      name: "singbox",
      script: "./sing-box",
      args: "run -D .",
      interpreter: "none",
      cwd,
    },
    // {
    //   name: "masque",
    //   script: "./usque",
    //   args: "socks -b 127.0.0.1 -p 1080",
    //   interpreter: "none",
    //   cwd,
    // },
  ],
};
