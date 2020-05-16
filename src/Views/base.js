export default function(ngapp, remote) {
    ngapp.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('base', {
            url: '',
            templateUrl: 'partials/base.html',
            controller: 'baseController'
        });
    }]);

    ngapp.controller('baseController', function ($scope, $document, $state) {
        var hostWindow = remote.getCurrentWindow();

        $scope.helpClick = function () {
            //$scope.toggleHelpModal();
        };

        $scope.minimizeClick = function () {
            hostWindow.minimize();
        };

        $scope.restoreClick = function () {
            if (hostWindow.isMaximized()) {
                hostWindow.unmaximize();
            } else {
                hostWindow.maximize();
            }
        };

        $scope.closeClick = function () {
            hostWindow.close();
        };

        $scope.$on('terminate', function() {
            remote.app.forceClose = true;
            $scope.closeClick();
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
