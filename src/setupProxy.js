const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/api", "/ws", "/topic", "/app"], {
      target: "http://localhost:8080",
      changeOrigin: true,
      ws: true,
      logger: console,
      router: {
        "/ws": "ws://localhost:8080",
        "/topic": "ws://localhost:8080",
        "/app": "ws://localhost:8080",
      },
      pathRewrite: { "/api": "" },
    })
  );
};
