chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab) {
    console.log(changeInfo);
    var regexUrl = /www\.youtube\.com/;
    if (regexUrl.test(tab.url) && changeInfo.title) {
        chrome.tabs.sendMessage(parseInt(tab.id), {message:"skip_ad",tab:tab.tabId}, function(response) {
            console.log(response);
        });
    }
})