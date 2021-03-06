export default function({ngapp, remote}) {
    let getImageSavePath = function() {
        return remote.dialog.showSaveDialog({
            title: 'Save character list',
            defaultPath: remote.app.getPath('documents'),
            filters: [{
                name: 'PNG Images',
                extensions: ['png']
            }]
        });
    };

    ngapp.config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('base.editCharacterList', {
            templateUrl: 'Views/editCharacterList.html',
            controller: 'editCharacterListController',
            url: '/editCharacterList',
            params: { list: null }
        });
    }]);

    ngapp.controller('editCharacterListController', function($scope, $state, $stateParams, $timeout, characterListService, characterListDisplayInterface, imageService) {
        $scope.list = $stateParams.list;

        // interfaces
        characterListDisplayInterface($scope);

        // helper functions
        let exportImage = function({canceled, filePath}) {
            if (canceled) return;
            let [tierChart] = document.getElementsByTagName('tier-chart');
            imageService.domToCanvas(tierChart, canvas => {
                imageService.canvasToFile(filePath, canvas);
            });
        };

        // scope functions
        $scope.displayCharacters = function() {
            if (!$scope.list.mediaEntries) return;
            if ($scope.groupBy === 'None') {
                $scope.groups = null;
                $scope.characters = $scope.buildCharacters();
            } else {
                $scope.characters = null;
                $scope.groups = $scope.buildGroups();
            }
            $scope.$applyAsync();
        };

        $scope.loadData = function() {
            characterListService.getDataFromAnilist($scope.list)
                .then($scope.displayCharacters)
        };

        $scope.characterStoreFilter = function(item) {
            return !item.assigned && !item.hidden;
        };

        $scope.saveList = function() {
            characterListService.saveList($scope.list);
        };

        $scope.exportImage = function() {
            $scope.$broadcast('startExport');
            $timeout(() => {
                getImageSavePath().then(result => {
                    exportImage(result);
                    $scope.$broadcast('stopExport');
                });
            });
        };

        $scope.back = function() {
            $state.go('base.manageCharacterLists');
        };

        $scope.dropAllowed = () => false;

        // events
        $scope.$on('characterRemoved', function() {
            $timeout($scope.displayCharacters);
        });

        // watchers
        $scope.$watch('sortBy', $scope.displayCharacters);
        $scope.$watch('groupBy', $scope.displayCharacters);
        $scope.$watch('sortGroupsBy', $scope.displayCharacters);
        $scope.$watch('showSupportingCharacters', $scope.displayCharacters);
    });
}
