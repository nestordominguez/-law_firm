module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks:["mocha"],
    singleRun: true,
    reporters:['mocha'],
    files:[
      "bower_components/angular/angular.js",
      "bower_components/chai/chai.js",

      "app/**/*.js",

      "test/*.js"
    ],
    'plugins': [
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-mocha-reporter'
    ]
  })
}
