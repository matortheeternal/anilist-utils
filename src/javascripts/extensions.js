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

Array.prototype.sortBy = function(getCompareValue) {
    return this.sort((a, b) => {
        let ca = getCompareValue(a),
            cb = getCompareValue(b);
        if (ca > cb) return -1;
        if (ca < cb) return 1;
        return 0;
    });
};

Array.prototype.sortByKey = function(key) {
    return this.sort((a, b) => {
        if (a[key] > b[key]) return -1;
        if (a[key] < b[key]) return 1;
        return 0;
    });
};

Array.prototype.group = function(protoGroups, makeGroupFn, entriesKey = 'entries') {
    return this.reduce((groups, entry) => {
        let protoGroup = protoGroups.find(g => g.test(entry)),
            group = groups.find(g => g.id === protoGroup.id);
        if (!group) groups.push(group = makeGroupFn(protoGroup));
        group[entriesKey].push(entry);
        return groups;
    }, []);
};

Array.prototype.swap = function(index1, index2) {
    let temp = this[index1];
    this[index1] = this[index2];
    this[index2] = temp;
};

Object.prototype.switch = function(getKey) {
    let options = this;
    return function() {
        return options[getKey()](...arguments);
    };
};