chrome.runtime.onMessage.addListener(function(request,response,senderResponse) {


    if(request.message === "toggle_video") {
        var video = document.getElementsByTagName('video')[0];
        if(video) {
            if(video.paused) {
                video.play();
                senderResponse({paused: false, tab:request.tab})
            } else {
                video.pause();
                senderResponse({paused: true, tab:request.tab})
            }
        } else {
            alert("no video preset!");
        }
    }

    if(request.message === "next_video") {
        var video = document.getElementsByTagName('video')[0];
        if(request.message === "next_video") {
            if(video) {
                var nextButton = document.getElementsByClassName("ytp-next-button ytp-button")[0];
                nextButton.click();
                senderResponse({nextVideo: true, tab:request.tabId});
            } else {
                senderResponse({nextVideo: false, tab:request.tabId});
            }
        }
    }
})