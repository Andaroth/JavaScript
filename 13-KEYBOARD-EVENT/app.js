function initialize() {
    var randColorTable = ["red","green","blue","pink","lightgreen","skyblue","slateblue","purple","orange","indigo"];
    var up = document.getElementById("up");
    var down = document.getElementById("down");
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    var characTerre = document.getElementById("character");
    var randColor = function() {
        var thisRand = Math.floor(Math.random()*randColorTable.length);
        return randColorTable[thisRand];
    }
    document.addEventListener("keydown", (e) => {
        var inPut = event.key;
        inPut = String(inPut);
        console.log("<< " + inPut);
        if ( (inPut == "ArrowUp") || (inPut == "ArrowDown") || (inPut == "ArrowLeft") || (inPut == "ArrowRight") ) {
            up.style.backgroundColor = randColor();
            up.classList.add("highlight");
            down.style.backgroundColor = randColor();
            down.classList.add("highlight");
            left.style.backgroundColor = randColor();
            left.classList.add("highlight");
            right.style.backgroundColor = randColor();
            right.classList.add("highlight");
        }
        switch (inPut) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                characTerre.style.backgroundColor = randColorTable[inPut];
                console.log("GET " + inPut + " in switch");
                break;
        } // switch
    }); // onkeydown end
    document.addEventListener("keyup", (e) => {
        up.classList.remove("highlight");
        down.classList.remove("highlight");
        left.classList.remove("highlight");
        right.classList.remove("highlight");
    }); // onkeyup end   
} // function initialize() end
initialize();