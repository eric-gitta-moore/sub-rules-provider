/*
# 安装 singbox
  $ curl https://github.com/SagerNet/sing-box/releases/download/v1.12.12/sing-box-1.12.12-linux-amd64.tar.gz -L | tar xzvf -

# 给 singbox 使用前需要转 json
  $ yq -o j 'del(.comment)' config.yaml > config.json

# pm2 保活
  $ apk add npm && npm i -g pm2 @dotenvx/dotenvx
# pm2 开机自动启动
  $ pm2 startup
# pm2 日志插件，限制日志大小，默认 10MB
  $ pm2 install pm2-logrotate
# pm2 运行应用
  $ pm2 start -n caddy dotenvx -- run -- caddy run --environ
  $ pm2 start -n singbox ./sing-box -- run -D .
  $ pm2 start -n masque ./usque -- socks -b 127.0.0.1 -p 1080
# 最后保存一下配置
  $ pm2 save


# (可选) cloudflared/ Cloudflare Tunnel / Argos Tunnel
  $ wget -O cloudflared https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 && chmod +x cloudflared
# wss 通道
  $ export $SITE_DOMAIN=a.cc
  $ TUNNEL_LOGLEVEL=debug ./cloudflared tunnel --no-tls-verify --origin-server-name $SITE_DOMAIN --http-host-header $SITE_DOMAIN --url https://localhost
# ws 通道
  $ TUNNEL_LOGLEVEL=debug ./cloudflared tunnel --http-host-header $SITE_DOMAIN --url http://localhost
*/
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
