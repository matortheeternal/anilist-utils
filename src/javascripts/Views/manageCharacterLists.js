export default function({ngapp}) {
    ngapp.config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('base.manageCharacterLists', {
            templateUrl: 'Views/manageCharacterLists.html',
            controller: 'manageCharacterListsController',
            url: '/manageCharacterLists'
        });
    }]);

    ngapp.controller('manageCharacterListsController', function($scope, $state, characterListService) {
        $scope.lists = characterListService.getAvailableLists();

        $scope.editList = function(filename) {
            $state.go('base.editCharacterList', {
                list: characterListService.loadList(filename)
            });
        };

        $scope.createList = function() {
            $state.go('base.editCharacterList', {
                list: characterListService.newList()
            });
        };

        $scope.deleteList = function(filename) {
            $scope.lists.remove(filename);
            characterListService.deleteList(filename);
        };
    });
}
