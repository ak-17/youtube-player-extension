chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab) {
    var regexUrl = /www\.youtube\.com\/watch/
    if (regexUrl.test(tab.url) && changeInfo.title && changeInfo.title!="YouTube") {
        chrome.tabs.sendMessage(parseInt(tab.id), {message:"skip_ad",script:"background.js",tab:tab.tabId});
    }
})