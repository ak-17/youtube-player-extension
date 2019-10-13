var widgetId = "widget";

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

function addWidget() {
    var bodyElement = $("body");

    var widgetElement = `
    <div id="widget">

    </div>
    `;
    bodyElement.append($(widgetElement));

    // $("#widget").css({
    //     "width": "80px",
    //     "height": "80px",
    //     "background": "seagreen",
    //     "border-radius": "50px",
    //     "z-index": "3589",
    //     "opacity":"0.5",
    //     "curson":"pointer"

    // });
}

$(function() {

    addWidget();

    dragElement(document.getElementById(widgetId));
    function dragElement(element) {
    var x1 =0, y1 = 0, x2 = 0, y2=0;

    element.onmousedown = dragMouseDown;

    function dragMouseDown(event) {
        event = event || window.event;
        event.preventDefault();
        x2 = event.clientX;
        y2 = event.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }


    function elementDrag(event) {
        event = event || window.event;
        event.preventDefault();

        x1 = x2 - event.clientX;
        y1 = y2 - event.clientY;

        x2 = event.clientX;
        y2 = event.clientY;

        element.style.top = (element.offsetTop - y1) + "px";
        element.style.left = (element.offsetLeft - x1) + "px";
    }

    function closeDragElement() {
        document.onmouseup=null;
        document.onmousemove = null;
    }
    
}




})
