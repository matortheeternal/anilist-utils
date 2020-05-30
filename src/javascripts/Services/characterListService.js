let getCharacterIds = function(media, role) {
    return media.characters.edges.filter(edge => {
        return edge.role === role;
    }).map(edge => edge.node.id);
};

let getMediaEntries = function(entries) {
    let mediaEntries = [];
    entries.forEach(({media, score}) => {
        mediaEntries.push({
            id: media.id,
            title: media.title.english || media.title.romaji,
            score: score,
            mainCharacterIds: getCharacterIds(media, 'MAIN'),
            supportingCharacterIds: getCharacterIds(media, 'SUPPORTING')
        });
    });
    return mediaEntries.sortByKey('score');
};

let getCharacters = function(entries) {
    let characters = {};
    entries.forEach(entry => {
        entry.media.characters.edges.forEach(({node}) => {
            let idKey = node.id.toString();
            if (characters.hasOwnProperty(idKey)) return;
            characters[idKey] = {
                id: node.id,
                name: node.name.full,
                image: node.image.medium,
                popularity: node.favourites
            };
        });
    });
    return characters;
};

let getDefaultTiers = function() {
    return ['A', 'B', 'C', 'D', 'F'].map(label => ({
        label,
        characters: []
    }));
};

export default function({ngapp}) {
    ngapp.service('characterListService', function(anilistService, dataInterface) {
        let service = this;

        dataInterface(service, 'characterLists');

        this.getDataFromAnilist = function(list) {
            return anilistService.getListEntriesWithCharacters({
                userName: list.profileName,
                mediaType: 'ANIME',
                status: 'COMPLETED'
            }).then((entries) => {
                list.characters = getCharacters(entries);
                list.mediaEntries = getMediaEntries(entries, list);
            });
        };

        this.getAvailableLists = function() {
            return service.listDataFiles();
        };

        this.loadList = function(filename) {
            let list = service.loadDataFile(filename);
            list.filename = filename;
            return list;
        };

        this.saveList = function(list) {
            if (!list.filename) list.filename = service.generateFilename(list.title);
            service.saveDataFile(list.filename, list);
        };

        this.newList = () => ({
            title: 'Anime Character Tier List',
            profileName: '',
            tiers: getDefaultTiers()
        });
    });
}