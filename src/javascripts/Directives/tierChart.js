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
        let allowedDragTypes = ['characterList', 'characterStore'];

        $scope.addTier = function() {
            $scope.tiers.push({
                label: '?',
                characters: []
            });
        };

        $scope.removeTier = function(tier) {
            $scope.tiers.remove(tier);
        };

        $scope.dropAllowed = function(dragData) {
            return dragData && allowedDragTypes.includes(dragData.source);
        };

        // events
        $scope.$on('itemRemoved', (e, item) => {
            item.assigned = false;
        });

        $scope.$on('itemAdded', (e, item) => {
            item.assigned = true;
        });
    });
}