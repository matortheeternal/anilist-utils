export default function({ngapp}) {
    ngapp.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('base', {
            url: '',
            templateUrl: 'Views/base.html',
            controller: 'baseController'
        });
    }]);

    ngapp.controller('baseController', function ($rootScope, $scope, $document, $state, rootContextMenuInterface) {
        // interfaces
        rootContextMenuInterface($scope);

        // event handlers
        $scope.$on('terminate', function() {
            remote.app.forceClose = true;
            $scope.closeClick();
        });

        $scope.$on('startDrag', (e, dragData) => {
            $rootScope.dragData = dragData
        });

        $scope.$on('stopDrag', () => {
            $rootScope.dragData = undefined
        });

        // keyboard shortcuts
        $document.bind('keypress', function(e) {
            // ctrl + shift + i
            if (e.keyCode === 9 && e.shiftKey && e.ctrlKey) {
                hostWindow.toggleDevTools();
            // ctrl + r
            } else if (e.keyCode === 18 && e.ctrlKey) {
                location.reload();
            }
        });

        // redirect to start
        $state.go('base.start');
    });
}
