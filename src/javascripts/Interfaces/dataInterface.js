export default function({ngapp, fh}) {
    ngapp.factory('dataInterface', function() {
        return function(service, dirName, ext = 'json') {
            let dataPath = fh.path('data', dirName);

            service.listDataFiles = function() {
                return fh.getFiles(dataPath, {
                    matching: '*.' + ext
                });
            };

            service.loadDataFile = function(filename) {
                return fh.loadJsonFile(fh.path(dataPath, filename));
            };

            service.saveDataFile = function(filename, data) {
                fh.saveJsonFile(fh.path(dataPath, filename), data);
            };

            service.generateFilename = function(base) {
                let filename = `${base}.${ext}`,
                    n = 1;
                while (fh.exists(fh.path(dataPath, filename)))
                    filename = `${base}-${++n}.${ext}`;
                return filename;
            }
        };
    });
};