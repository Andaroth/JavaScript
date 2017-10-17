function loadJason(toLoad, callback) {
    console.log("> loadJason(" + toLoad + ", callback);");
    var loadData = new XMLHttpRequest();
    loadData.overrideMimeType("application/json");
    loadData.open("GET", toLoad, true);
    console.log("loadData : " + loadData);
    loadData.onload = function() {
        if (loadData.readyState == 4 && loadData.status == "200") {
            callback(loadData.responseText);
        }
    }
    loadData.send(null);
    console.log("loadData : " + loadData);
}

function initialize() {
    console.log("> initialize();")
    loadJason("https://raw.githubusercontent.com/becodeorg/Lovelace-promo-2/master/Parcours/JavaScript/11-AJAX/files/data.json", function(response) {
        var peopleList = JSON.parse(response);
        console.log("Computed : \n" + peopleList);
    });
}

initialize();



/*for (let i in peopleList) {
    var randScore = Math.floor(Math.rand()*1000);
    peopleList[i].score = randScore;
}*/

/*var randScoring = peopleList.map(function(i) {
    let randScore = Math.floor(Math.rand()*1000);
    return randScore;
});*/