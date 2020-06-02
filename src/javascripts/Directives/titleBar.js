export default function({ngapp, remote}) {
    ngapp.directive('titleBar', function() {
        return {
            restrict: 'E',
            templateUrl: 'Directives/titleBar.html',
            scope: true,
            controller: 'titleBarController'
        }
    });

    ngapp.controller('titleBarController', function($scope) {
        let hostWindow = remote.getCurrentWindow();

        // event handlers
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
    });
}