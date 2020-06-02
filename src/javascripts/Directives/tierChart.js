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

    ngapp.controller('tierChartController', function($scope, tierStyleService) {
        let allowedDragTypes = ['characterList', 'characterStore'];

        $scope.dropAllowed = function(dragData) {
            return dragData && allowedDragTypes.includes(dragData.source);
        };

        // events
        $scope.$on('itemAdded', (e, item) => {
            item.assigned = true;
        });

        $scope.$on('addTier', (e, tier) => {
            let index = $scope.tiers.indexOf(tier);
            $scope.tiers.splice(index, 0, {
                label: '?',
                style: tierStyleService.defaultStyle,
                characters: []
            });
        });

        $scope.$on('removeTier', (e, tier) => {
            let index = $scope.tiers.indexOf(tier);
            if (index === -1) return;
            $scope.tiers.splice(index, 1);
        });

        $scope.$on('moveTierUp', (e, tier) => {
            let index = $scope.tiers.indexOf(tier);
            if (index === 0) return;
            $scope.tiers.swap(index, index - 1);
        });

        $scope.$on('moveTierDown', (e, tier) => {
            let index = $scope.tiers.indexOf(tier);
            if (index + 1 === $scope.tiers.length) return;
            $scope.tiers.swap(index, index + 1);
        });
    });
}