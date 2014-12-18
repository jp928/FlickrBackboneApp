'use strict';

require
        .config({
          doT: {
            ext: '.dot', // extension of the templates, defaults to .dot
            templateSettings: {
              evaluate: /\{\{([\s\S]+?)\}\}/g,
              interpolate: /\{\{=([\s\S]+?)\}\}/g,
              encode: /\{\{!([\s\S]+?)\}\}/g,
              use: /\{\{#([\s\S]+?)\}\}/g,
              define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
              conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
              iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
              varname: 'it',
              strip: true,
              append: true,
              selfcontained: false
            }
          },

          shim: {
            underscore: {
              exports: '_'
            },

            backbone: {
              deps: ['underscore', 'jquery'],
              exports: 'Backbone'
            },

            bootstrap: {
              deps: ['jquery'],
              exports: 'jquery'
            }

          },

          config: {
            moment: {
              noGlobal: true
            }
          },

          paths: {
            jquery: '../bower_components/jquery/dist/jquery',
            backbone: '../bower_components/backbone/backbone',
            underscore: '../bower_components/underscore/underscore',
            bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
            doT: '../bower_components/doT/doT',
            text: '../bower_components/requirejs-text/text',
            moment: '../bower_components/moment/min/moment.min'
          }
        });

require(['backbone', 'router'], function(Backbone, AppRouter) {

  new AppRouter();

  Backbone.history.start();

});