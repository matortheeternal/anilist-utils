export default function(ngapp) {
    ngapp.config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('base.makeCharacterList', {
            templateUrl: 'partials/makeCharacterList.html',
            controller: 'makeCharacterListController',
            url: '/makeCharacterList'
        });
    }]);

    ngapp.controller('makeCharacterListController', function($scope, anilistService) {
        $scope.profileName = 'test';

        $scope.loadEntries = function () {
            anilistService.getListEntriesWithCharacters({
                userName: $scope.profileName,
                role: 'MAIN',
                mediaType: 'ANIME',
                status: 'COMPLETED'
            }).then((entries) => {
                $scope.entries = entries;
            });
        };
    });
}
