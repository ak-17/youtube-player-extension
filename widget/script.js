dragElement(document.getElementById("widget"));
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

$(function() {
    $("#widget").hover(function() {
        $("#widget2").css("display","");
        $("#widget3").css("display","");
    }, function() {
        $("#widget2").css("display","none");
        $("#widget3").css("display","none");
    });
})