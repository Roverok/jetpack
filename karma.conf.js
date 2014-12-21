module.exports = function(config) {
  config.set({
    plugins: [
      'karma-coffee-preprocessor',
      'karma-jasmine',
      'karma-chrome-launcher'
    ],
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    files: [
      'src/coffee/*.coffee',
      'src/coffee/test/*.spec.coffee'
    ],
    preprocessors: {
      'src/**/*.coffee': ['coffee']
    },
    coffeePreprocessor: {
      // options passed to the coffee compiler
      options: {
        bare: true,
        sourceMap: false
      },
      // transforming the filenames
      transformPath: function(path) {
        return path.replace(/\.coffee$/, '.js');
      }
    },
  });
};
