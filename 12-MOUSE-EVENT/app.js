function initialize() {
    var hoverMe = document.getElementsByClassName("hoverMe");
    var reset = document.getElementById("reset");
    var axeXDOM = document.getElementById("axe-x");
    var axeYDOM = document.getElementById("axe-y");
    
    for (i=0;i<hoverMe.length;i++) {
        var thisElem = hoverMe[i];
        var thisElemName = thisElem.className;
        thisElem.addEventListener("mouseover", function() {
            this.classList.add("hidden");
        });
    }
    
    reset.addEventListener("click", function() {
        for (i=0;i<hoverMe.length;i++) {
            var target = hoverMe[i];
            target.classList.remove("hidden");
        }
    });
    
    document.addEventListener("mousemove", function(e) {
        var axeX = e.clientX;
        var axeY = e.clientY;
        axeXDOM.innerHTML = "X: " + axeX;
        axeYDOM.innerHTML = "Y: " + axeY;
    });
}

initialize();