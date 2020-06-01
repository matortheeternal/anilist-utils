export default function({ngapp}) {
    ngapp.run(function(hotkeyService) {
        hotkeyService.addHotkeys('dropdownItems', {
            upArrow: 'handleUpArrow',
            downArrow: 'handleDownArrow',
            escape: 'hideDropdown',
            enter: 'selectItem'
        });
    });

    ngapp.run(function(hotkeyService) {
        hotkeyService.addHotkeys('dropdown', {
            downArrow: 'toggleDropdown',
            enter: 'toggleDropdown'
        });
    });
}