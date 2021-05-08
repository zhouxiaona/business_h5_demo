const baseUrlObj = {
    "development": '/api', // 本地
    "production": 'https://xxx/xx', // 打包线上域名
    "local": 'http://xxx:9090', // 本地开发-代理服务端本地ip
    "release": 'https://xxx/xx', // 本地开发-代理线上域名
};
module.exports = baseUrlObj;