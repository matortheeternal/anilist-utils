export default function({ngapp}) {
    let popularityGroups = [
        3000, 2000, 1500, 1000, 750, 500,
        400,  300,  200,  150,  100, 75,
        50,   25,   15,   10,   5,   0
    ].map((v, n, a) => ({
        id: n + 1,
        title: n === 0 ?
            `${v}+ favorites` :
            `${v}-${a[n - 1] - 1} favorites`,
        test: c => c.popularity >= v
    }));

    ngapp.factory('characterListDisplayInterface', function() {
        return function(scope) {
            // initialization
            scope.groupBy = 'Media';
            scope.sortGroupsBy = 'Score';
            scope.sortBy = 'Popularity';

            // private functions
            let sortCharacters = {
                Popularity: a => a.sortBy(item => item.popularity),
                Name: a => a.sortBy(item => item.name.full).reverse()
            }.switch(() => scope.sortBy);

            let sortGroups = {
                Score: a => a.sortBy(group => group.score),
                Popularity: a => a.sortBy(group => group.popularity),
                Name: a => a.sortBy(group => group.title).reverse()
            }.switch(() => scope.sortGroupsBy);

            let showCharacter = function(character) {
                return !character.hidden && !character.assigned;
            };

            // public api
            scope.getCharacters = function(entry) {
                let characterIds = Array.prototype.concat(
                    entry.mainCharacterIds,
                    scope.showSupportingCharacters ?
                        entry.supportingCharacterIds : []
                );
                let characters = characterIds
                    .map(id => scope.list.characters[id])
                    .filter(showCharacter);
                return sortCharacters(characters);
            };

            scope.updateGroup = {
                Media: group => {
                    group.characters = scope.getCharacters(group);
                },
                Popularity: group => {
                    group.characters = group.characters.filter(showCharacter);
                }
            }.switch(() => scope.groupBy)

            scope.buildGroups = {
                Media: () => {
                    let groups = scope.list.mediaEntries.map(entry => Object.assign({
                        characters: scope.getCharacters(entry)
                    }, entry));
                    return sortGroups(groups);
                },
                Popularity: () => {
                    let characters = scope.buildCharacters();
                    return characters.group(popularityGroups, g => ({
                        id: g.id,
                        title: g.title,
                        characters: []
                    }), 'characters');
                }
            }.switch(() => scope.groupBy);

            scope.buildCharacters = function() {
                let characters = new Set();
                scope.list.mediaEntries.forEach(entry => {
                    scope.getCharacters(entry).forEach(character => {
                        characters.add(character);
                    });
                });
                return sortCharacters(Array.from(characters));
            };
        };
    });
}