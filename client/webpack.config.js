const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = webpackEnv => {

  const mode = webpackEnv.WEBPACK_SERVE ? 'development' : 'production'

  const entry = './src/index.js' // 애플리케이션 진입점
  const isEnvDevelopment = mode === 'development'
  const isEnvProduction = mode === 'production'

  return {
    mode,
    entry:entry,
    output: { // 번들된 파일을 저장할 경로
      publicPath: '/',
      filename: 'bundle.[hash].js' 
    },
    devtool: isEnvDevelopment ? "eval-cheap-source-map" : false,   
    module: {
        rules: [
          { // es6 바벨 관련 loader ,  .js 와 함께 .jsx 확장자도 번들함. node_modules 안에 있는 파일은 번들에서 제외
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
          { // 웹팩이 html을 읽을 수 있게 해줌, minimize: true 는 코드 최적화를 하는 옵션
            test: /\.html$/,
            use: [
              {
                loader: 'html-loader',
                options: {
                  minimize: true,
                },
              },
            ],
          },
          { // CSS를 번들링하기 위해서는 css-loader와 style-loader를 함께 사용해야 한다.
            test: /\.css$/, // .css 확장자로 끝나는 모든 파일
            use: ['style-loader', 'css-loader'] 
          },
        ],
      },

    plugins: [ 
      new HtmlWebpackPlugin({ // 템플릿을 지정하거나 favicon을 설정할 수 있음
        template: 'public/index.html', // public/index.html 를 템플릿으로 지정
        }),
        new CleanWebpackPlugin(), // 성공적으로 다시 빌드 한 후 webpack의 output.path에있는 모든 빌드 폴더를 제거 및 정리

      ],

    devServer: {  // 개발서버
        historyApiFallback: true,  // router 새로고침 404 해결
        host: '0.0.0.0',
        port: port,
        open: true, // 서버가 실행될 때 브라우저를 자동으로 열어줄지 결정
    },
  }
};