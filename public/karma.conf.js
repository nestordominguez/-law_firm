module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks:["mocha"],
    singleRun: false,
    reporters:['mocha','coverage'],
    preprocessors:{
      'app/**/*.js':['coverage']
    },
    coverageReporter:{
      includeAllSources:true,
      reporters:[{
        type:"html",
        dir:'test/coverage',
        subdir:'.'
      },{
        type:"text"
      }]
    },
    files:[
      "bower_components/angular/angular.js",
      "bower_components/angular-mocks/angular-mocks.js",
      "bower_components/chai/chai.js",

      "app/**/*.js",

      "test/**/*.js"
    ]
  })
}
