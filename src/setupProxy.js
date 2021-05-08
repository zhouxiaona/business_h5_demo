const { createProxyMiddleware } = require("http-proxy-middleware");
const baseUrlObj = require('./api/baseUrlConfig');
module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api", {
            target: baseUrlObj[process.env.ENV_PROXY],
            secure: false,
            changeOrigin: true,
            pathRewrite: {
                "^/api": ""
            }
        })
    );
};