export default function({ngapp, fh}) {
    ngapp.run(function(contextMenuService, anilistService) {
        let {getCharacterUrl} = anilistService;

        contextMenuService.addContextMenu('characterImage', [
            {
                id: 'Remove',
                visible: scope => scope.character.assigned,
                build: (scope, items) => {
                    items.push({
                        label: 'Remove',
                        callback: () => {
                            scope.$emit('removeCharacter', scope.character);
                        }
                    });
                }
            },
            {
                id: 'Hide',
                visible: () => true,
                build: (scope, items) => {
                    items.push({
                        label: 'Hide',
                        callback: () => {
                            scope.$emit('removeCharacter', scope.character);
                            scope.character.hidden = true;
                        }
                    });
                }
            },
            {
                id: 'Open anilist page',
                visible: () => true,
                build: (scope, items) => {
                    items.push({
                        label: 'Open anilist page',
                        callback: () => {
                            let url = getCharacterUrl(scope.character);
                            fh.openUrl(url);
                        }
                    });
                }
            }
        ]);
    });
}