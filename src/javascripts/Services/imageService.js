const base64HeaderExpr = /^data:image\/[^;]+;base64,/;
const fs = require('fs');
const html2canvas = require('html2canvas');

export default function({ngapp}) {
    ngapp.service('imageService', function() {
        // public api
        this.canvasToFile = function(filePath, canvas) {
            let data = canvas.toDataURL().replace(base64HeaderExpr, '');
            fs.writeFileSync(filePath, data, 'base64');
        };

        this.domToCanvas = function(node, callback) {
            html2canvas(node).then(callback);
        };
    });
}