let Character = {
    "name":"Bertrand",
    "level":19,
    "life":100,
    "items_to_give":["MacBook","Thermos","Baffle","Enseignement","Aide"]
}

let opponentCharacter= {};
for (let i in Character) {
    opponentCharacter[i] = Character[i];
}
opponentCharacter.name = "Axel";
opponentCharacter.level = 24;

let weapon = {
    "name":"Épée",
    "damage":1.3
}

function giveItem() {
    var i = Math.floor(Math.random() * Character.items_to_give.length);
    console.log(i);
    
    console.log(Character.name+" vous donne son "+(Character.items_to_give[i]).toLowerCase());
    document.write("<br/>"+Character.name+" vous donne son "+Character.items_to_give[i]+"<br/>");
}

function attack(a,b) {
    let source = a;
    let cible = b;
    var degats = source["level"] * weapon["damage"];
    document.write(source["name"]+" attaque "+cible["name"]+" et lui inflige "+degats+" de dommage<br/>");
    cible["life"] -= degats;
    document.write(cible["name"]+" a "+cible["life"]+" points de vie");
}

giveItem();
attack(Character,opponentCharacter);