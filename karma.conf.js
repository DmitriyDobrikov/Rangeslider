var webpackConfig = require('./webpack.config');
module.exports=function(config) {
config.set({
    // конфигурация репортов о покрытии кода тестами
    coverageReporter: {
      dir:'tmp/coverage/',
      reporters: [
        { type:'html', subdir: 'report-html' },
        { type:'lcov', subdir: 'report-lcov' }
      ],
      instrumenterOptions: {
        istanbul: { noCompact:true }
      }
    },
    // spec файлы, условимся называть по маске **_*.spec.js_**
    files: [
        './allTestFiles.test.js', //все файлы
        //'./src/View/view.test.js',
        // './src/View/handler/handler.test.js',

    ],
    frameworks: [ 'chai', 'jasmine' ],
    // репортеры необходимы для  наглядного отображения результатов
    reporters: ['mocha', 'coverage'],//['mocha', 'coverage'],
    preprocessors: {
      './allTestFiles.test.js': ['webpack', 'sourcemap'],//все файлы
      //'./src/View/view.test.js': ['webpack', 'coverage'],
      // './src/View/handler/handler.test.js': ['webpack', 'coverage'],
    },
    //frameworks: ['jasmine-jquery', 'jasmine', 'requirejs'],

    plugins: [
        'karma-jasmine', 'karma-mocha',
        'karma-chai', 'karma-coverage',
        'karma-webpack', 'karma-phantomjs-launcher',
        'karma-mocha-reporter', 'karma-sourcemap-loader',
        
 
    ],
    // передаем конфигурацию webpack
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo:true
    },

    // browsers : ['Chrome']
  });
};