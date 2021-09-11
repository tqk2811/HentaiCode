var cmid;
var cm_clickHandler = function(clickData, tab) {
    console.log(clickData);
    chrome.tabs.create({url : "https://nhentai.net/g/" + clickData.selectionText.trim() });
};

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.request === 'NhentaiContextMenu') {
        var type = msg.selection;
        let index = type.trim().search(/^\d+$/i);
        if (index == -1) {
            if (cmid != null) {
                chrome.contextMenus.remove(cmid);
                cmid = null;
            }
        } 
        else 
        {
            var options = {
                title: "Go to %s on nhentai",
                contexts: ['selection'],
                onclick: cm_clickHandler
            };

            if (cmid != null) 
            {
                chrome.contextMenus.update(cmid, options);
            } 
            else 
            {
                cmid = chrome.contextMenus.create(options);
            }
        }
    }
});