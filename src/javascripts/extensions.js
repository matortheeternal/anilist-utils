// ARRAY EXTENSIONS
Array.prototype.pluck = function(key) {
    return this.map(o => o[key]);
};

Array.prototype.count = function(callback) {
    let c = 0;
    this.forEach(entry => {
        if (callback(entry)) c++;
    });
    return c;
};

Array.prototype.remove = function(entry) {
    let n = this.indexOf(entry);
    if (n > -1) return this.splice(n, 1);
};

Array.prototype.sortBy = function(key) {
    return this.sort((a, b) => {
        if (a[key] > b[key]) return -1;
        if (a[key] < b[key]) return 1;
        return 0;
    });
};