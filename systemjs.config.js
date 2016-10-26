
(function (global) {
  System.config({

    paths: {

      'npm:': 'node_modules/'
    },

    map: {

      app: 'app',

      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

      'firebase':                   'npm:/firebase',
      'angularfire2':               'npm:/angularfire2',
      'angular2-localstorage':      'npm:/angular2-localstorage/dist',
      'ng2-datetime':               'npm:/ng2-datetime',
      'ng2-select':                 'npm:/ng2-select',
      'ng2-tag-input':              'npm:/ng2-tag-input',
      'ng2-charts':                 'npm:/ng2-charts',

      'rxjs':                       'npm:rxjs',
      'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api'
      
    },

    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular2-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      },
      firebase: { 
        main: 'firebase.js', 
        defaultExtension: 'js' 
      },
      angularfire2: {
        main: 'angularfire2.js',
        defaultExtension: 'js'
      },
      'angular2-localstorage': {
        defaultExtension: "js"
      },
      'ng2-datetime': { 
        main: 'ng2-datetime.js', 
        defaultExtension: 'js' 
      },
      'ng2-select': { 
        main: 'ng2-select.js', 
        defaultExtension: 'js' 
      },
      'ng2-tag-input': { 
        main: './dist/index.js', 
        defaultExtension: 'js' 
      },
      'ng2-charts': { 
        main: 'ng2-charts.js', 
        defaultExtension: 'js' 
      }
    }
  });
})(this);
