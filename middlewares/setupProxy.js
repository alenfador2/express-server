const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'https://express-server-ty1w.onrender.com',
      changeOrigin: true,
    })
  );
};
