export default function({ngapp, fh}) {
    ngapp.service('tierStyleService', function() {
        this.styles = fh.loadJsonFile('data/tierStyles.json');

        this.defaultStyle = this.styles.find(style => {
            return style.label === 'Default';
        }) || this.styles[0];
    });
}