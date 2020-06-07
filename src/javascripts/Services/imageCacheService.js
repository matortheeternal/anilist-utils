const request = require('request');
const fs = require('fs');

export default function({ngapp, fh}) {
    ngapp.service('imageCacheService', function() {
        let imageCache;
        let cacheDir = fh.path('cache');

        // helper functions
        let buildCache = function() {
            imageCache = {};
            if (fh.jetpack.exists(cacheDir) !== 'dir') return;
            let imageFiles = fh.jetpack.find(cacheDir, { matching: '*' });
            imageFiles.forEach(filePath => {
                let filename = fh.getFileName(filePath);
                imageCache[filename] = fh.pathToFileUrl(filePath);
            });
        };

        let downloadImage = function(imageUrl) {
            return new Promise((resolve, reject) => {
                fh.jetpack.dir(cacheDir);
                let filePath = fh.path('cache', fh.getFileName(imageUrl)),
                    fileStream = fs.createWriteStream(filePath);
                request.get(imageUrl)
                    .on('error', reject)
                    .on('end', () => {
                        setTimeout(() => {
                            fileStream.destroy();
                            resolve(fh.pathToFileUrl(filePath));
                        }, 50);
                    })
                    .pipe(fileStream);
            });
        };

        // public api
        this.cache = function(imageUrl) {
            return new Promise((resolve, reject) => {
                let cacheKey = fh.getFileName(imageUrl);
                if (imageCache.hasOwnProperty(cacheKey))
                    return resolve(imageCache[cacheKey]);
                downloadImage(imageUrl).then(resolve, reject);
            });
        };

        // initiailization
        buildCache();
    });
};