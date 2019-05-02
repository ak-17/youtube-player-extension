var youtubeUrl = '*://www.youtube.com/watch?v*';
var tabQuery = {url: youtubeUrl};
var playIconClass = "fas fa-play-circle text-light";
var pauseIconClass = "fas fa-pause-circle text-light";


chrome.tabs.query(tabQuery, function(tabs) {
    var container = $('#content');
    tabs.forEach(function(tab) {
        var stateIcon = tab.audible ? 'pause': 'play';
        var newElement  = 
        `<div class ="mb-2 p-2 bg-primary">
            <p class="text-light m-0 title" style="cursor:pointer" id="title${tab.id}">${tab.title}</p>
            <button type="button" class="btn p-0 playControl" id="playControl${tab.id}">
                <i class="fas fa-${stateIcon}-circle text-light"></i>
            </button>
            <button type="button" class="btn p-0 next"  id="next${tab.id}">
                <i class="fas fa-step-forward text-light"></i>
            </button>
        </div>`
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
    $('.title').click(function() {
        var elementId = '#' + $(this).attr('id');
        var tabId = $(this).attr('id').replace("title","");
        chrome.tabs.update(parseInt(tabId),{active:true});
    })
})

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab) {
    var regexUrl = /www\.youtube\.com/;
    if (regexUrl.test(tab.url) && changeInfo.title) {
        document.getElementById("title" + tabId).textContent = changeInfo.title;
    }
})



