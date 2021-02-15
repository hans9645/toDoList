const ClockContainer=document.querySelector(".clockj");
const ClockTitle=ClockContainer.querySelector("h1");

function getTime(){
    const date= new Date();
    hour=date.getHours(),
    minutes=date.getMinutes(),
    seconds=date.getSeconds();

    ClockTitle.innerText=`${hour > 9 ? hour : `0${hour}` }:${minutes>9?minutes:`0${minutes}`}:${
        seconds < 10 ? ` 0${seconds} ` : seconds}`;

    //     seconds >= 10 ? ClockTitle.innerText=`${hour}:${minutes}:${seconds}`:
    // ClockTitle.innerText=`${hour}:${minutes}:0${seconds}`;
    //

}

function init(){
    getTime();
    setInterval(getTime,900);
}

init();


