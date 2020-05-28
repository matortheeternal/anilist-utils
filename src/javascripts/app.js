// Use new ES6 modules syntax for everything.
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import fileHelpers from './helpers/fileHelpers.js';
import env from './env';
import './extensions.js';
import baseView from './Views/base.js';
import startView from './Views/start.js';
import manageCharacterListsView from './Views/manageCharacterLists.js';
import editCharacterListView from './Views/editCharacterList.js';
import dataInterface from './Interfaces/dataInterface.js';
import listDragInterface from './Interfaces/listDragInterface.js';
import anilistService from './Services/anilistService.js';
import characterListService from './Services/characterListService.js';
import imageCacheService from "./Services/imageCacheService";
import htmlHelpers from "./Services/htmlHelpers";
import tierChart from './Directives/tierChart.js';
import characterImage from './Directives/characterImage.js';
import listView from './Directives/listView.js';
import dropover from './Directives/dropover.js';
import ngDrag from './Directives/ngDrag.js';
import ngDrop from './Directives/ngDrop.js';
import expandableSection from "./Directives/expandableSection";
import characterListDisplayInterface from "./Interfaces/characterListDisplayInterface";

// set up angular application
let ngapp = angular.module('application', [
    'ui.router', 'ct.ui.router.extras'
]);

// set up helpers
let fh = fileHelpers(remote, jetpack);
let args = {fh, ngapp, remote};

//this allows urls with and without trailing slashes to go to the same state
ngapp.config(function ($urlMatcherFactoryProvider) {
    $urlMatcherFactoryProvider.strictMode(false);
});

// INTERFACES
dataInterface(args);
listDragInterface(args);
characterListDisplayInterface(args);

// SERVICES
anilistService(args);
characterListService(args);
imageCacheService(args);
htmlHelpers(args);

// DIRECTIVES
tierChart(args);
characterImage(args);
dropover(args);
ngDrag(args);
ngDrop(args);
listView(args);
expandableSection(args);

// VIEWS
baseView(args);
startView(args);
manageCharacterListsView(args);
editCharacterListView(args);