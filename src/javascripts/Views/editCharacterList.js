export default function({ngapp}) {
    ngapp.config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('base.editCharacterList', {
            templateUrl: 'Views/editCharacterList.html',
            controller: 'editCharacterListController',
            url: '/editCharacterList',
            params: { list: null }
        });
    }]);

    ngapp.controller('editCharacterListController', function($scope, $state, $stateParams, $timeout, characterListService, characterListDisplayInterface) {
        $scope.list = $stateParams.list;

        // interfaces
        characterListDisplayInterface($scope);

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

        $scope.back = function() {
            $state.go('base.manageCharacterLists');
        };

        $scope.dropAllowed = () => false;

        // events
        $scope.$on('itemRemoved', function() {
            if (!$scope.groups) return;
            $timeout(() => {
                $scope.groups.forEach(group => {
                    group.characters = $scope.getCharacters(group);
                });
            });
        });

        // watchers
        $scope.$watch('sortBy', $scope.displayCharacters);
        $scope.$watch('groupBy', $scope.displayCharacters);
        $scope.$watch('sortGroupsBy', $scope.displayCharacters);
    });
}
