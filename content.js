chrome.runtime.onMessage.addListener(function(request,response,senderResponse) {
    if(request.message === "skip_ad") {
        console.log(request);
        var btnSlot = document.getElementsByClassName("ytp-ad-skip-button-slot");
        var skipBtnContainer = document.getElementsByClassName("ytp-ad-skip-button-container");
        var skipButton = document.getElementsByClassName("ytp-ad-skip-button ytp-button")[0];
        if(btnSlot[0] && skipBtnContainer[0]) {
            btnSlot[0].style.display = "";
            skipBtnContainer[0].style.display = "";
            skipButton.click();
            senderResponse({adSkip:true, tab:request.tab});
        } else {
            senderResponse({adSkip:false,tab:request.tab});
        }
    }
    
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
            }else {
                senderResponse({nextVideo: false, tab:request.tabId});
            }
        }
    }
})