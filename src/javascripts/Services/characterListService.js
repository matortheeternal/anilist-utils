let lookupCharacters = function(ids, characters) {
    return ids.map(id => characters[id]);
};

let getMediaCharacterIds = function(media) {
    return media.characters.nodes.pluck('id');
}

let getCharacterCount = function(characters) {
    return characters.count(c => !c.hidden && !c.assigned);
};

let getMediaEntries = function(entries, list) {
    let mediaEntries = [];
    entries.forEach(({media, score}) => {
        let characterIds = getMediaCharacterIds(media),
            characters = lookupCharacters(characterIds, list.characters),
            characterCount = getCharacterCount(characters);
        mediaEntries.push({
            id: media.id,
            title: media.title.english || media.title.romaji,
            score: score,
            characterIds,
            characters,
            characterCount
        });
    });
    return mediaEntries.sortBy('score');
};

let getCharacters = function(entries) {
    let characters = {};
    entries.forEach(entry => {
        entry.media.characters.nodes.forEach(c => {
            let idKey = c.id.toString();
            if (characters.hasOwnProperty(idKey)) return;
            characters[idKey] = {
                id: c.id,
                name: c.name,
                image: c.image,
                popularity: c.favourites
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

let importListData = function(list) {
    let {mediaEntries, characters} = list;
    mediaEntries.forEach(entry => {
        entry.characters = lookupCharacters(entry.characterIds, characters);
        entry.characterCount = getCharacterCount(entry.characters);
    });
};

let exportListData = function(list) {
    return {
        
    }
};

export default function({ngapp}) {
    ngapp.service('characterListService', function(anilistService, dataInterface) {
        let service = this;

        dataInterface(service, 'characterLists');

        this.getDataFromAnilist = function(list) {
            return anilistService.getListEntriesWithCharacters({
                userName: list.profileName,
                role: 'MAIN',
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
            return importListData(list);
        };

        this.saveList = function(list) {
            let filename = service.generateFilename(list.title);
            service.saveDataFile(filename, exportListData(list));
        };

        this.newList = () => ({
            title: 'Anime Character Tier List',
            profileName: '',
            tiers: getDefaultTiers()
        });
    });
}