export default function({ngapp}) {
    ngapp.config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('base.editCharacterList', {
            templateUrl: 'Views/editCharacterList.html',
            controller: 'editCharacterListController',
            url: '/editCharacterList',
            params: { list: null }
        });
    }]);

    ngapp.controller('editCharacterListController', function($scope, $stateParams, characterListService) {
        $scope.list = $stateParams.list;

        $scope.loadData = function() {
            characterListService.getDataFromAnilist($scope.list).then(() => {
                $scope.$applyAsync();
            })
        };

        $scope.characterStoreFilter = function(item) {
            return !item.assigned && !item.hidden;
        };
    });
}
