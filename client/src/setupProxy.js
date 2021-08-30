 
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};
//프론트엔드 3000번에서 줄 때 타겟을 5000번으로 주겠다는 것임.
// 적용이안됨 ㅡㅡ;