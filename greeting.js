const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetingsForm");

//local storage는 urls를 기초로 작동한다.
const USER_LS = "currentUser",
    SHOWING_CN = "showing";
//따옴표 생략하고 할 수있도록 const설정


function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();//submit됨과 동시에 창이 다시 실행되기때문에 눈에 보이지않게 되서 
    const currentValue = input.value;
    //console.log(currentValue);
    paintGreeting(currentValue);
    saveName(currentValue);

}


function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);

    //이대로 끝내면 로컬스토리지에 저장을 하지않아서 새로고침을 할 경우 저장을 하지 못하는 문제점이 발생.
    //따라서 함수하나를 더 만들어줘야한다. ->saveName()
}

function paintGreeting(text) { //currentUser를 받아와서 hello와 함께 출력하는 코드

    form.classList.remove(SHOWING_CN); //표시하려면 form을 숨겨야한다? 왜?
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadname() { // currentUser가 있는지 확인 후 paintingGreeting을 하는 코드.
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser == null) {
        askForName();

    } else {

        paintGreeting(currentUser);
    }
}

function init() {
    loadname();

}

init();