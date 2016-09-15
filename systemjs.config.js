/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      // other libraries
      'rxjs':                       'npm:rxjs',
      'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
      'firebase':                   'node_modules/firebase',
      'angularfire2': 'node_modules/angularfire2',
      'ng2-datetime':               'node_modules/ng2-datetime',
      'ng2-select':                 'node_modules/ng2-select',
      'ng2-tag-input':              'node_modules/ng2-tag-input',
      'ng2-charts':                 'node_modules/ng2-charts'
    },
    // packages tells the System loader how to load when no filename and/or no extension
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
        defaultExtension: 'js',
        main: 'angularfire2.js'
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
