export default function({ngapp}) {
    ngapp.value('dragModes', {
        characterStore: {
            getItem: function(scope, index) {
                let item = scope.displayItems[index];
                scope.$applyAsync(() => {
                    item.assigned = true;
                });
                return item;
            },
            dropAllowed: function() {
                return false;
            }
        },
        characterList: {
            getItem: function(scope, index) {
                return scope.displayItems.splice(index, 1)[0];
            },
            dropAllowed: function(dragData) {
                if (dragData.element.assigned) return false;
                return dragData.source === 'characterStore' ||
                    dragData.source === 'characterList';
            }
        }
    });
}