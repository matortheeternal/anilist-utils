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

    ngapp.controller('characterImageController', function($scope, $element, imageCacheService) {
        if (!$scope.character) $scope.character = $scope.$parent.$parent.item;
        let remoteUrl = $scope.character && $scope.character.image;

        $element[0].style['background-image'] = `url("${remoteUrl}")`;
        $element[0].title = $scope.character.name;
        /*imageCacheService.cache(remoteUrl).then(fileUrl => {
            $scope.imageUrl = fileUrl;
        }, err => {
            console.error('Error loading image for character: ', character, err);
            $scope.imageUrl = errorImageUrl;
        });*/
    });
}