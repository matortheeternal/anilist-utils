export default function({ngapp}) {
    ngapp.directive('characterImage', function() {
        return {
            restrict: 'E',
            scope: {
                character: '=?'
            },
            templateUrl: 'Directives/characterImage.html',
            controller: 'characterImageController'
        };
    });

    ngapp.controller('characterImageController', function($scope, $element, contextMenuInterface) {
        if (!$scope.character) $scope.character = $scope.$parent.$parent.item;
        let remoteUrl = $scope.character && $scope.character.image;

        $element[0].style['background-image'] = `url("${remoteUrl}")`;
        $element[0].title = $scope.character.name;

        // interfaces
        contextMenuInterface($scope, 'characterImage');

        // event handlers
        $element.on('mousedown', e => {
            if (e.button !== 2) return;
            $scope.showContextMenu(e);
        });
    });
}