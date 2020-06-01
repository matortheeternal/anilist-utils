const borderStyles = [
    'borderLeftStyle', 'borderLeftWidth',
    'borderRightStyle', 'borderRightWidth'
];

const fontStyles = [
    'fontFamily', 'fontSize', 'fontWeight', 'fontStyle',
    'letterSpacing', 'textTransform', 'wordSpacing'
];

const paddingStyles = ['paddingLeft', 'paddingRight'];

export default function({ngapp}) {
    let wrapper = angular.element(
        '<div style="position:fixed; top:-900px;"></div>'
    );

    angular.element(document.body).append(wrapper);

    let getPixelSize = function(style, key) {
        return parseInt(style.getPropertyValue(key));
    };

    let getParentWidth = function(element) {
        let parent = element[0],
            width = 0,
            parentStyle;

        do {
            parent = parent.parentNode;
            parentStyle = getComputedStyle(parent);
            width = getPixelSize(parentStyle, 'width') -
                getPixelSize(parentStyle, 'padding-left') -
                getPixelSize(parentStyle, 'padding-right');
        } while(parentStyle.getPropertyValue('display') !== 'block' &&
            parent.nodeName.toLowerCase() !== 'body' );

        return width + 'px';
    };

    let getMaxWidth = function(element, style) {
        return style.maxWidth === 'none' ?
            getParentWidth(element) : style.maxWidth;
    };

    let setMirrorStyle = function(mirror, element) {
        let style = getComputedStyle(element[0]),
            defaultMaxWidth = getMaxWidth(element, style),
            copyStyle = value => mirror.css(value, style[value]);

        element.css('minWidth', style.minWidth);
        element.css('maxWidth', defaultMaxWidth);
        fontStyles.forEach(copyStyle);

        if (style.boxSizing === 'border-box') {
            borderStyles.forEach(copyStyle);
            paddingStyles.forEach(copyStyle);
        } else if (style.boxSizing === 'padding-box') {
            paddingStyles.forEach(copyStyle);
        }
    };

    let createMirrorElement = function(element) {
        let mirrorElement = angular.element(
            '<span style="white-space:pre;">&#000;</span>'
        );
        setMirrorStyle(mirrorElement, element);
        wrapper.append(mirrorElement);
        return mirrorElement;
    };

    let makeUpdateFunction = function(element, attrs, mirrorElement) {
        return function() {
            let newValue = element.val() || attrs.placeholder || '';
            if (mirrorElement.text() === newValue) return;
            mirrorElement.text(newValue);
            element.css('width', mirrorElement.prop('offsetWidth') + 1 + 'px');
        };
    };

    let createMirror = function(scope, element, attrs) {
        let mirrorElement = createMirrorElement(element),
            update = makeUpdateFunction(element, attrs, mirrorElement);

        scope.$watch(attrs.ngModel, update);
        element.on('keydown keyup focus input propertychange change', update);

        return {
            element: mirrorElement,
            update,
            remove: () => mirrorElement.remove()
        };
    };

    ngapp.directive('elastic-input', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                let mirror = createMirror(scope, element, attrs);
                mirror.update();
                scope.$on('$destroy', () => mirror.remove());
            }
        };
    });
}