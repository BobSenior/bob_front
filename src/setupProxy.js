const { createProxyMiddleware } = require("http-proxy-middleware");

// src/setupProxy.js
module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/api", "ws:"], {
      target: "http://localhost:8080",
      changeOrigin: true,
      ws: true,
      pathRewrite: { "/api": "", "ws:": "ws://localhost:8080" },
    })
  );
};
