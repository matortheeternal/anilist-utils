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
import elasticInput from "./Directives/elasticInput";
import scalingText from "./Directives/scalingText";
import keycodeService from "./Services/keycodeService";
import hotkeyService from "./Services/hotkeyService";
import hotkeyInterface from "./Interfaces/hotkeyInterface";
import dropdown from "./Directives/dropdown";
import eventService from "./Services/eventService";
import tierRow from "./Directives/tierRow";
import tierStyleService from "./Services/tierStyleService";
import dropdownHotkeys from "./Hotkeys/dropdownHotkeys";
import titleBar from "./Directives/titleBar";

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
hotkeyInterface(args);

// SERVICES
anilistService(args);
characterListService(args);
imageCacheService(args);
htmlHelpers(args);
keycodeService(args);
hotkeyService(args);
eventService(args);
tierStyleService(args);

// HOTKEYS
dropdownHotkeys(args);

// DIRECTIVES
tierChart(args);
characterImage(args);
dropover(args);
ngDrag(args);
ngDrop(args);
listView(args);
expandableSection(args);
elasticInput(args);
scalingText(args);
dropdown(args);
tierRow(args);
titleBar(args);

// VIEWS
baseView(args);
startView(args);
manageCharacterListsView(args);
editCharacterListView(args);