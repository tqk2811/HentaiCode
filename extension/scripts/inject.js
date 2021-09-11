document.addEventListener('selectionchange', function() {
    var selection = window.getSelection().toString().trim();
    chrome.runtime.sendMessage({
        request: 'NhentaiContextMenu',
        selection: selection
    });
});