document.body.classList.remove("bg-aqua");
document.body.classList.add("bg-olive");

var target = document.getElementById("first-paragraph");
target.classList.remove("bg-lime");
target.classList.remove("gray");
target.classList.add("aqua");

target = document.getElementsByClassName("bg-silver");
for (i=0;i<target.length;i++) {
    target[i].classList.add("bg-teal");
    target[i].classList.remove("bg-silver");
}

target = document.querySelector("blockquote");
for (i=0;i<target.length;i++) {
    target[i].classList.add("bg-white");
}

// 2
target = document.querySelector("#my-table");
target.classList.add("bg-purple");


target = document.querySelectorAll(".container p"); 
for (i=0;i<target.length;i++) {
    target[i].classList.add("shadow");
}

// 3
target = document.querySelectorAll("pre"); 
for (i=0;i<target.length;i++) {
    target[i].style.color = "white";
    target[i].style.backgroundColor = "grey";
    target[i].style.borderTop = "3px solid red";
    target[i].style.borderBottom = "3px solid red";
}

target = document.querySelector("h3");
target.innerHTML = "<em>Italic title ! yeah !</em>";

target = document.querySelector("h2");
target.textContent = "<strong>HTML doens't work !</strong>";

// 4
var parent = document.querySelector("ul");
var newLi= document.createElement("li");
newLi.innerHTML = "Mon meilleur ami est <a href=\"http://google.com/\" target=\"_blank\">Google</a>";
parent.appendChild(newLi);


// 4 bis 
parent = document.querySelector("ol")
target = parent.querySelectorAll("li");
for (i=0;i<target.length;i++) {
    console.log(target[i]);
    target[i].remove();
}