export default function({ngapp}) {
    ngapp.factory('listDragInterface', function() {
        return function($scope) {
            // helper functions
            let removeClasses = function(element) {
                element.classList.remove('insert-after');
                element.classList.remove('insert-before');
            };

            let onSameItem = function(dragData, e, index) {
                return e.target === dragData.element &&
                    index === dragData.index;
            };

            let getAfter = function(e) {
                if ($scope.horizontal) {
                    return e.offsetX > (e.target.offsetWidth / 2);
                } else {
                    return e.offsetY > (e.target.offsetHeight / 2);
                }
            };

            // event handlers
            $scope.onItemDrag = function(e, index) {
                if (!$scope.dragType || $scope.disableDrag) return;
                $scope.$root.$broadcast('startDrag', {
                    element: e.target,
                    source: $scope.dragType,
                    index: index,
                    getItem: () => {
                        let item = $scope.items.splice(index, 1)[0];
                        $scope.$emit('itemRemoved', item);
                        return item;
                    }
                });
                return true;
            };

            $scope.onItemDragOver = function(e, index) {
                if (!$scope.dragType || $scope.disableDrag) return;
                let dragData = $scope.$root.dragData;
                if (!$scope.dropAllowed(dragData)) return;
                if (onSameItem(dragData, e, index)) return true;
                let after = getAfter(e);
                e.target.classList[after ? 'add' : 'remove']('insert-after');
                e.target.classList[after ? 'remove' : 'add']('insert-before');
                return true;
            };

            $scope.onPlaceholderDragOver = function() {
                return $scope.dropAllowed($scope.$root.dragData);
            };

            $scope.onItemDragLeave = (e) => removeClasses(e.target);

            $scope.onItemDrop = function(e, index) {
                if (!$scope.dragType || $scope.disableDrag) return;
                let dragData = $scope.$root.dragData;
                if (!$scope.dropAllowed(dragData)) return;
                if (onSameItem(dragData, e, index)) return;
                let after = getAfter(e),
                    lengthBefore = $scope.items.length,
                    movedItem = dragData.getItem(),
                    adjust = lengthBefore > $scope.items.length && index > dragData.index;
                removeClasses(e.target);
                $scope.items.splice(index + after - adjust, 0, movedItem);
                $scope.$emit('itemAdded', movedItem);
                $scope.$emit('itemsReordered');
                return true;
            };

            $scope.onPlaceholderDrop = function() {
                let dragData = $scope.$root.dragData;
                if (!$scope.dropAllowed(dragData)) return;
                let movedItem = dragData.getItem();
                $scope.items.push(movedItem);
                $scope.$emit('itemAdded', movedItem);
                $scope.$emit('itemsReordered');
                return true;
            };

            $scope.$on('startDrag', function() {
                $scope.$applyAsync(() => $scope.dragging = true);
            });

            $scope.$on('stopDrag', function() {
                $scope.$applyAsync(() => $scope.dragging = false);
            });
        }
    })
}