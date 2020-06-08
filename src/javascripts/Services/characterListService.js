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

let importList = function(list) {
    return Object.assign({}, list, {
        tiers: list.tiers.map(tier => ({
            label: tier.label,
            style: tier.style,
            characters: tier.characterIds.map(id => {
                return list.characters[id];
            })
        }))
    });
};

let exportList = function(list) {
    return Object.assign({}, list, {
        tiers: list.tiers.map(tier => ({
            label: tier.label,
            style: tier.style,
            characterIds: tier.characters.pluck('id')
        }))
    });
}

export default function({ngapp, fh}) {
    ngapp.service('characterListService', function(anilistService, dataInterface, tierStyleService) {
        let service = this;

        let getDefaultTiers = function() {
            return ['A', 'B', 'C', 'D', 'F'].map(label => ({
                label,
                style: tierStyleService.defaultStyle,
                characters: []
            }));
        };

        dataInterface(service, 'characterLists');

        // public API;
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
            return service.listDataFiles().map(filePath => ({
                label: fh.getFileBase(filePath),
                filePath
            }));
        };

        this.loadList = function(filename) {
            let list = service.loadDataFile(filename);
            list.filename = filename;
            return importList(list);
        };

        this.saveList = function(list) {
            if (!list.filename) list.filename = service.generateFilename(list.title);
            service.saveDataFile(list.filename, exportList(list));
        };

        this.newList = () => ({
            title: 'Anime Character Tier List',
            profileName: '',
            tiers: getDefaultTiers()
        });
    });
}