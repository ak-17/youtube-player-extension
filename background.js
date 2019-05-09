chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab) {
    var regexUrl = /www\.youtube\.com\/watch/
    if (regexUrl.test(tab.url) && changeInfo.title && changeInfo.title!="YouTube") {
        chrome.tabs.sendMessage(parseInt(tab.id), {message:"skip_ad",script:"background.js",tab:tab.tabId});
    }
})

var contextMenuItem = {
    "id": "videoLink",
    "title": "Play Next",
    "contexts" : ["link"],
    "targetUrlPatterns": ["https://www.youtube.com/watch?*"],
    "documentUrlPatterns": ["https://www.youtube.com/*"]
};

chrome.contextMenus.create(contextMenuItem);

// chrome.contextMenus.onClicked.addListener(function(clickData, tab) {
//     if(clickData.menuItemId == "videoLink" && clickData.linkUrl) {
//         chrome.tabs.sendMessage(parseInt(tab),{message:"playNext",videoUrl: clickData.linkUrl,tab:tab.tabId});
//     }
// })