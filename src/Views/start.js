export default function(ngapp) {
    ngapp.config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('base.start', {
            templateUrl: 'partials/start.html',
            controller: 'startController',
            url: '/start'
        });
    }]);

    ngapp.controller('startController', function($scope, $state) {
        $scope.makeCharacterTierList = function() {
            $state.go('base.makeCharacterList');
        };
    });
}
