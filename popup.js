var youtubeUrl = '*://www.youtube.com/watch?v*';
var tabQuery = {url: youtubeUrl};
var playIconClass = "fas fa-play text-light";
var pauseIconClass = "fas fa-pause text-light";

// remove notification index from start of title
function removeNotification(title) {
    
}

chrome.tabs.query(tabQuery, function(tabs) {
    var container = $('#holder');
    tabs.forEach(function(tab) {
        var stateIcon = tab.audible ? 'pause': 'play';
        var videoId = tab.url.replace("https://www.youtube.com/watch?v=","");
        var newElement = `
        <div class="audio green-audio-player" id = "tabContent${tab.id}">
            <img class="yt-thumbnail" src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="" srcset="">        
            <button class="btn p-2 border-0 playControl" id="playControl${tab.id}">  
                <i class="fas fa-${stateIcon} text-light"></i>
            </button>
            <button class="btn p-2 border-0 next" id="next${tab.id}">  
                <i class="fas fa-step-forward text-light"></i>
            </button>
            <p class="title m-0" id="title${tab.id}-${tab.windowId}">${tab.title.slice(0,35)+'...'}</p>
            <button type="button" class="close" id ="close${tab.id}" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `
        container.append($(newElement))
    });
    if(tabs.length == 0) {
        var emptyElement = `
        <div class ="mb-2 p-2 bg-warning">
            <p class="text-light m-0 title">No videos open</p>
        </div>
        `;
        container.append(emptyElement);
    }
})

$(function() {
    $('.playControl').click(function() {
        var elementId = '#' + $(this).attr('id');
        var tabId = $(this).attr('id').replace("playControl","")
        chrome.tabs.sendMessage(parseInt(tabId), {message:'toggle_video',tab:tabId}, function(response) {
            if(response.paused) {
                $(elementId).children().removeClass();
                $(elementId).children().addClass(playIconClass);
            } else {
                $(elementId).children().removeClass();
                $(elementId).children().addClass(pauseIconClass);
            }
        })
    })
})

$(function() {
    $('.next').click(function() {
        var elementId = '#' + $(this).attr('id');
        var tabId = $(this).attr('id').replace("next","");
        chrome.tabs.sendMessage(parseInt(tabId), {message: "next_video",tab:tabId},function(response) {
            if(response.nextVideo) {
                var playControlId = '#playControl'+tabId.toString();
                $(playControlId).children().removeClass();
                $(playControlId).children().addClass(pauseIconClass);
            } else {
                console.log("action cannot be performed");
            }
        })
    })
})

$(function() {
    $('.close').click(function() {
        var tabId = $(this).attr('id').replace("close","");
        var tabContent = document.getElementById("tabContent"+tabId);
        tabContent.parentNode.removeChild(tabContent);
        chrome.tabs.remove(parseInt(tabId));
    })
})


$(function() {
    $('.title').click(function() {
        var elementId = '#' + $(this).attr('id');
        var ids = $(this).attr('id').replace("title","").split('-');
        chrome.windows.update(parseInt(ids[1]),{focused: true});
        chrome.tabs.update(parseInt(ids[0]),{active:true});
    })
})

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab) {
    var regexUrl = /www\.youtube\.com/;
    if (regexUrl.test(tab.url) && changeInfo.title) {
        document.getElementById("title" + tabId).textContent = changeInfo.title;
    }
})



