var options = [
    {
        cmid: null,
        title: "Hentai",
        id: "hentai_root"
    },
    {
        cmid: null,
        title: "Goto %s on NHentai",
        contexts: ['selection'],
        parentId: "hentai_root",
        onclick: function(clickData, tab) {
            chrome.tabs.create({url : "https://nhentai.net/g/" + clickData.selectionText.trim() });
        }
    },
    {
        cmid: null,
        title: "Goto %s on HentaiVn",
        contexts: ['selection'],
        parentId: "hentai_root",
        onclick: function(clickData, tab) {
            chrome.tabs.create({url : `https://hentaivn.tv/${clickData.selectionText.trim()}-doc-truyen-.html` });
        }
    }
];

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.request === 'hentaiContextMenu') {
        var type = msg.selection;
        let index = type.trim().search(/^\d+$/i);
        if (index == -1) {
            options.forEach(function(option) {
                if (option.cmid != null) {
                    chrome.contextMenus.remove(option.cmid);
                    option.cmid = null;
                }
            });
        } 
        else 
        {
            options.forEach(function(option) {
                if (option.cmid != null) 
                {
                    chrome.contextMenus.update(cmid, option);
                }
                else
                {
                    option.cmid =chrome.contextMenus.create(option);
                }
            });
        }
    }
});