let Character = {
    "name":"Bertrand",
    "age":19,
    "items_to_give":["MacBook","Thermos","Baffle","Enseignement","Aide"],
}

for (let i in Character) {
    console.log(i+": "+Character[i]);
    document.write("<br/>"+i+": "+Character[i]);
}

function giveItem() {
    var i = Math.floor(Math.random() * Character.items_to_give.length);
    console.log(i);
    
    console.log(Character.name+" vous donne son "+(Character.items_to_give[i]).toLowerCase());
    document.write("<br/>"+Character.name+" vous donne son "+Character.items_to_give[i]);
}

giveItem();