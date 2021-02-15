const body = document.querySelector("body");
let IMG_NUMBER;


function handleImgload(){
    console.log("finished loading");
}

function paintIMG(IMG_NUMBER){      
    const img = new Image();
    img.src=`./images/${IMG_NUMBER+1}.jpg`;
    img.classList.add("bgImage");
    body.appendChild(img);
    //img.addEventListener("loadend",handleImgload); api에서 하고 있으면 필요할거다??

}

function genRandom(){
    const number=Math.floor(Math.random()*10);
    return number;
}
function init(){
    const randomNumber=genRandom();
    paintIMG(randomNumber);

}

init();