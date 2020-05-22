export default function({ngapp}) {
    ngapp.directive('listView', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/listView.html',
            transclude: true,
            scope: {
                items: '=',
                filter: '=',
                defaultAction: '=?',
                dragType: '@',
                disableDrag: '=?'
            },
            controller: 'listViewController'
        }
    });

    ngapp.controller('listViewController', function($scope, $element, htmlHelpers, listDragInterface) {
        // initialization
        $scope.parent = htmlHelpers.findParent($element[0], el => {
            return el.hasAttribute('list-view-parent');
        });

        $scope.listItems = $element[0].firstElementChild;
        $scope.horizontal = $element[0].hasAttribute('horizontal');

        // interfaces
        listDragInterface($scope);

        // watchers
        $scope.$watch('items', function() {
            $scope.displayItems = $scope.items.filter($scope.filter || (() => true));
        }, true);
    });
}