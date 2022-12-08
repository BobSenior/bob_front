const { createProxyMiddleware } = require("http-proxy-middleware");

// src/setupProxy.js
module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/api", "ws:"], {
      target: "https://bobsenior.co.kr",
      changeOrigin: true,
      ws: true,
      pathRewrite: { "/api": "", "ws:": "wss://bobsenior.co.kr" },
    })
  );
};
