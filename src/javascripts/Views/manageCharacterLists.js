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

        $scope.editList = function(list) {
            $state.go('base.editCharacterList', {
                list: characterListService.loadList(list.filePath)
            });
        };

        $scope.createList = function() {
            $state.go('base.editCharacterList', {
                list: characterListService.newList()
            });
        };

        $scope.deleteList = function(list) {
            $scope.lists.remove(list);
            characterListService.deleteList(list.filePath);
        };
    });
}
