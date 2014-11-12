'use strict';

module.exports = function(config) {

  config.set({
    basePath : '../', //!\\ Ignored through gulp-karma //!\\

    files : [ //!\\ Ignored through gulp-karma //!\\
        'bower_components/angular/angular.js',
        'bower_components/angular-resource/angular-resource.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'src/*.js',
        'test/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Firefox'],

    plugins : [
        'karma-firefox-launcher',
        'karma-jasmine'
    ]
  });

};
