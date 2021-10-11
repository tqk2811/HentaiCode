var options = [
    {
        cmid: null,
        create: {
            title: "Hentai",
            id: "hentai_root",
            contexts: ['selection'],
        },
        update: {
            title: "Hentai",
            contexts: ['selection'],
        }
    },
    {
        cmid: null,
        create:{
            title: "Goto %s on NHentai",
            contexts: ['selection'],
            parentId: "hentai_root",
            id: "child_NHentai",
            onclick: function(clickData, tab) {
                chrome.tabs.create({url : "https://nhentai.net/g/" + clickData.selectionText.trim() });
            }
        },
        update: {
            title: "Goto %s on NHentai",
            contexts: ['selection'],
            parentId: "hentai_root",
            onclick: function(clickData, tab) {
                chrome.tabs.create({url : "https://nhentai.net/g/" + clickData.selectionText.trim() });
            }
        }
    },
    {
        cmid: null,
        create:{
            title: "Goto %s on HentaiVn",
            contexts: ['selection'],
            parentId: "hentai_root",
            id: "child_HentaiVN",
            onclick: function(clickData, tab) {
                chrome.tabs.create({url : `https://hentaivn.tv/${clickData.selectionText.trim()}-doc-truyen-.html` });
            }
        },
        update: {
            title: "Goto %s on HentaiVn",
            contexts: ['selection'],
            parentId: "hentai_root",
            onclick: function(clickData, tab) {
                chrome.tabs.create({url : `https://hentaivn.tv/${clickData.selectionText.trim()}-doc-truyen-.html` });
            }
        }
    }
];

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.request === 'hentaiContextMenu') {
        var type = msg.selection;
        let index = type.trim().search(/^\d+$/i);
        if (index == -1) {
            if (options[0].cmid != null) {
                console.log("remove");
                chrome.contextMenus.remove(options[0].cmid);
                options.forEach(function(option) {option.cmid = null;});
            }
        } 
        else 
        {
            options.forEach(function(option) {
                if (option.cmid != null) 
                {
                    console.log("update");
                    chrome.contextMenus.update(option.cmid, option.update);
                }
                else
                {
                    console.log("create");
                    option.cmid = chrome.contextMenus.create(option.create);
                }
            });
        }
    }
});