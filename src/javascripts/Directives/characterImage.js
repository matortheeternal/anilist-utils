export default function({ngapp, fh}) {
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

    ngapp.controller('characterImageController', function($scope, $element, contextMenuInterface, imageCacheService) {
        if (!$scope.character) $scope.character = $scope.$parent.$parent.item;
        let remoteUrl = $scope.character && $scope.character.image;

        $element[0].title = $scope.character.name;

        // interfaces
        contextMenuInterface($scope, 'characterImage');

        // download image locally
        imageCacheService.cache(remoteUrl).then(localUrl => {
            $element[0].style['background-image'] = `url("${localUrl}")`;
        });

        // event handlers
        $element.on('mousedown', e => {
            if (e.button !== 2) return;
            $scope.showContextMenu(e);
        });
    });
}