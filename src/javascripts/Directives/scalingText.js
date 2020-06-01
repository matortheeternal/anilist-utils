export default function({ngapp}) {
    let initFontSize = function(el) {
        el.style.fontSize = getComputedStyle(el).fontSize;
    };

    let getFontSize = function(el) {
        return parseInt(el.style.fontSize);
    };

    let setFontSize = function(el, size) {
        el.style.fontSize = `${size}px`;
    };

    let getRowCount = function(text) {
        let match = text.match(/\s/g);
        return match ? match.length + 1 : 1;
    }

    let makeUpdateFunction = function(el, attrs) {
        let oldValue = '',
            targetHeight = attrs.targetHeight || el.offsetHeight,
            targetWidth = attrs.targetWidth || el.offsetWidth,
            delta = attrs.fontSizeDelta || 4,
            minFontSize = attrs.minFontSize || 12,
            maxFontSize = attrs.maxFontSize || 72,
            updateTimeout;

        let update = function() {
            let newValue = el.value || '';
            if (oldValue === newValue) return;
            let fontSize = getFontSize(el);
            while (el.scrollHeight <= targetHeight && fontSize < maxFontSize) {
                fontSize = Math.min(fontSize + delta, maxFontSize);
                setFontSize(el, fontSize);
            }
            while (fontSize > minFontSize && el.scrollHeight > targetHeight ||
            el.scrollWidth > targetWidth) {
                fontSize = Math.max(fontSize - delta, minFontSize);
                setFontSize(el, fontSize);
            }
            oldValue = newValue;
            el.setAttribute('rows', getRowCount(newValue.trim()));
        };

        return function() {
            if (updateTimeout) clearTimeout(updateTimeout);
            updateTimeout = setTimeout(update, 50);
        };
    };

    ngapp.directive('scalingText', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                let update = makeUpdateFunction(element[0], attrs);

                element.on('keydown keyup focus input propertychange change', update);
                scope.$watch(attrs.ngModel, update);

                // init
                initFontSize(element[0]);
                update();
            }
        }
    })
}