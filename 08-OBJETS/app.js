let Character = {
    "name":"Bertrand",
    "level":19,
    "life":300,
    "atk":12,
    "def":13,
    "agil":25,
    "items_to_give":["MacBook","Thermos","Baffle","Enseignement","Aide"]
}

let opponentCharacter= {};
for (let i in Character) {
    opponentCharacter[i] = Character[i];
}
opponentCharacter.name = "Axel";
opponentCharacter.level = 24;
opponentCharacter.atk = 15;
opponentCharacter.def = 13;
opponentCharacter.agil = 21;

let sword = {
    "name":"Épée",
    "damage":1.3
}
let gun = {}
for (let i in sword) {
    gun[i] = sword[i];
}
gun.name="Pistolet";
gun.damage=2.6;

function giveItem() {
    var i = Math.floor(Math.random() * Character.items_to_give.length);
    console.log(i);
    
    console.log(Character.name+" vous donne son "+(Character.items_to_give[i]).toLowerCase());
    document.write("<br/>"+Character.name+" vous donne son "+Character.items_to_give[i]+"<br/>");
}

function attack(source,cible,arme) {
    var degats = 
        Math.ceil((
            source["level"] * 
            (arme["damage"] * ((source["atk"])/10)) /
            (
                (cible["def"]) * (Math.random() * cible["agil"])
            )
        )*(100-cible["agil"]));
    
    if (degats > source["atk"]*arme["damage"])
    {
        document.write("<strong>Critique !!</strong><br/>");
    }
    
    document.write(source["name"]+" attaque "+cible["name"]+" avec "+arme["name"]+" et lui inflige "+degats+" de dommage<br/>");
    cible["life"] -= degats;
    document.write(cible["name"]+" a "+cible["life"]+" points de vie<br/>");
    
    if (cible["life"] <= 0)
    {
        document.write("<strong>"+cible["name"]+" est mort...</strong><br/>");
    }
    
}

giveItem();
attack(Character,opponentCharacter,gun);

