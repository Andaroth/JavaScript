function minus(a, b) {
    return (a-b);
}
function divide(a, b) {
    return (a/b);
}
function multi(a, b) {
    return (a*b);
}

function percent(a, b) {
    return ((b/100)*a);
}

function speed(a,b) {
    return (a/b)+"Km/h";
}

document.write("A = 25 et B = 10");

console.log("Minus : "+minus(25,10));
document.write("<br/>&gt; Minus : "+minus(25,10));
console.log("Divide : "+divide(25,10));
document.write("<br/>&gt; Divide : "+divide(25,10));
console.log("Multi : "+multi(25,10));
document.write("<br/>&gt; Multi : "+multi(25,10));
console.log("% : "+percent(25,10));
document.write("<br/>&gt; % : "+percent(25,10));
console.log("Speed : "+speed(25,10));
document.write("<br/>&gt; Speed : "+speed(25,10));