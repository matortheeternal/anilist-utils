export default function({ngapp}) {
    ngapp.directive('tierChart', function() {
        return {
            restrict: 'E',
            scope: {
                tiers: '='
            },
            transclude: true,
            templateUrl: 'Directives/tierChart.html',
            controller: 'tierChartController'
        };
    });

    ngapp.controller('tierChartController', function($scope) {
        $scope.addTier = function() {
            $scope.tiers.push({
                label: '?',
                characters: []
            });
        };

        $scope.removeTier = function(tier) {
            $scope.tiers.remove(tier);
        };
    });
}