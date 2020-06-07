export default function({ngapp}) {
    ngapp.directive('tierRow', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'directives/tierRow.html',
            controller: 'tierRowController'
        }
    });

    ngapp.controller('tierRowController', function($scope, $element, tierStyleService, htmlHelpers) {
        let {resolveElement} = htmlHelpers,
            el = $element[0];

        $scope.tier = $scope.$parent.tier;
        $scope.styles = tierStyleService.styles;

        $scope.removeTier = function() {
            $scope.$emit('removeTier', $scope.tier);
        };

        $scope.addTier = function() {
            $scope.$emit('addTier', $scope.tier);
        };

        $scope.moveTierUp = function() {
            $scope.$emit('moveTierUp', $scope.tier);
        };

        $scope.moveTierDown = function() {
            $scope.$emit('moveTierDown', $scope.tier);
        };

        $scope.selectStyle = function(style) {
            $scope.$applyAsync(() => {
                $scope.tier.style = style;
            });
        };

        $scope.$on('startExport', function() {
            let tierLabel = resolveElement(el, '.tier-label'),
                textarea = resolveElement(tierLabel, 'textarea'),
                paragraph = resolveElement(tierLabel, 'p');
            paragraph.style.fontSize = textarea.style.fontSize;
            $scope.export = true;
        });

        $scope.$on('stopExport', function() {
            $scope.export = false;
        });

        $scope.$on('removeCharacter', (e, character) => {
            $scope.tier.characters.remove(character);
            character.assigned = false;
            $scope.$emit('characterRemoved', character);
            e.stopPropagation();
        });

        $scope.$watch('$parent.$index', () => {
            $scope.canMoveUp = !$scope.$parent.$first;
            $scope.canMoveDown = !$scope.$parent.$last;
        });
    });
}