export default function({ngapp}) {
    ngapp.directive('expandableSection', function($timeout) {
        return {
            restrict: 'E',
            transclude: {
                title: 'title',
                contents: 'contents'
            },
            templateUrl: 'Directives/expandableSection.html',
            link: function(scope, element) {
                let titleElement = element[0].children[0],
                    iconElement = titleElement.children[0];

                titleElement.addEventListener('click', function() {
                    scope.$applyAsync(() => {
                        scope.show = !scope.show;
                    });
                    iconElement.classList.toggle('collapsed');
                    iconElement.classList.toggle('expanded');
                    $timeout(() => scope.$broadcast('vsRepeatTrigger'));
                });
            }
        }
    });
}