function initialize() {
    var randColor = ["red","green","blue","pink","lightgreen","skyblue","slateblue","purple","orange"];
    var up = document.getElementById("up");
    var down = document.getElementById("down");
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    var characTerre = document.getElementById("character");
    var randCol;
    function randGet() {
        randCol = Math.floor(Math.random()*randColor.length);
        randCol = randColor[randCol];
        console.log("for sure");
    }
    document.addEventListener("keydown", (e) => {
        console.log("randCol = " + randCol);
        var inPut = event.key;
        console.log("<< " + inPut);
        if ( (inPut == "ArrowUp") || (inPut == "ArrowDown") || (inPut == "ArrowLeft") || (inPut == "ArrowRight") ) {
            randGet();
            up.style.backgroundColor = randCol;
            up.classList.add("highlight");
            randGet();
            down.style.backgroundColor = randCol;
            down.classList.add("highlight");
            randGet();
            left.style.backgroundColor = randCol;
            left.classList.add("highlight");
            randGet();
            right.style.backgroundColor = randCol;
            right.classList.add("highlight");
        } else if(isNaN(inPut)) {
            inPut = parseInt(inPut);
        }
        console.log(inPut);
        switch (inPut) {
            case 0:
                randGet();
                characTerre.backgroundColor = randCol;
                console.log("case");
                break;
            case 1:
                randGet();
                characTerre.backgroundColor = randCol;
                console.log("case");
                break;
            case 2:
                randGet();
                characTerre.backgroundColor = randCol;
                console.log("case");
                break;
            case 3:
                randGet();
                characTerre.backgroundColor = randCol;
                console.log("case");
                break;
            case 4:
                randGet();
                characTerre.backgroundColor = randCol;
                console.log("case");
                break;
            case 5:
                randGet();
                characTerre.backgroundColor = randCol;
                console.log("case");
                break;
            case 6:
                randGet();
                characTerre.backgroundColor = randCol;
                console.log("case");
                break;
            case 7:
                randGet();
                characTerre.backgroundColor = randCol;
                console.log("case");
                break;
            case 8:
                randGet();
                characTerre.backgroundColor = randCol;
                console.log("case");
                break;
            case 9:
                randGet();
                characTerre.backgroundColor = randCol;
                console.log("case");
                break;
        } // switch
    }); // onkeypress end
    document.addEventListener("keyup", (e) => {
        up.classList.remove("highlight");
        down.classList.remove("highlight");
        left.classList.remove("highlight");
        right.classList.remove("highlight");
    }); // onkeyup end   
} // function initialize() end
initialize();