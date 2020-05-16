// Use new ES6 modules syntax for everything.
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import fh from './helpers/fileHelpers.js';
import env from './env';
import baseView from './Views/base.js';
import startView from './Views/start.js';

// set up helpers
let fileHelpers = fh(remote, jetpack);

// set up angular application
let ngapp = angular.module('application', [
    'ui.router', 'ct.ui.router.extras'
]);

//this allows urls with and without trailing slashes to go to the same state
ngapp.config(function ($urlMatcherFactoryProvider) {
    $urlMatcherFactoryProvider.strictMode(false);
});

// VIEWS
baseView(ngapp, remote);
startView(ngapp);