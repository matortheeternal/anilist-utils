let listCharactersQuery = ({mediaType, status}) =>
`query ($userName: String) {
  MediaListCollection(userName: $userName, type: ${mediaType}, status: ${status}) {
    hasNextChunk,
    lists {
      entries {
        score,
        media {
          id,
          title { english, romaji },
          characters {
            edges {
              role,
              node {
                id,
                name { full },
                image { medium },
                favourites
              }
            }
          }
        }
      }
    }
  }
}`;

let extractEntries = function({data}) {
    let entries = [];
    data.data.MediaListCollection.lists.forEach(list => {
        list.entries.forEach(entry => entries.push(entry));
    });
    return entries;
};

export default function({ngapp}) {
    ngapp.service('anilistService', function($http) {
        const baseOptions = {
            method: 'POST',
            url: 'https://graphql.anilist.co',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        this.getListEntriesWithCharacters = function(options) {
            return $http(Object.assign({
                data: {
                    query: listCharactersQuery(options),
                    variables: { userName: options.userName }
                }
            }, baseOptions)).then(extractEntries);
        };

        this.getCharacterUrl = function(character) {
            return `https://anilist.co/character/${character.id}`;
        };
    });
};