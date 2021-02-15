const weather = document.querySelector(".js-weather");


const API_KEY = '2fd688bc25761531436561f7bcf2884d';
const COORDS = 'coords';

//javascript는 웹사이트로 request를 보내고 응답을 통해서 데이터를 얻을 수 있다.
//가져온 데이터의 refresh(새로고침) 없이도 나의 웹사이트에 저굥시킬 수 있다.
//새로고침 없이도 메일이 새로 오는것을 확인 할 수 있는 이유.

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature}℃  
            ${place} 구름낀건지 맑은 건지 보일 수 있도록 추가 설정하자.`;
        });
    //then 은 데이터가 완전히 들어온 뒤 작동하는 함수.
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));

}

function handleGeoSuccess(position) {
    //위치 찾는거 성공했을 때 들고오는 함수
    //console.log(position);
    //console.log(position.coords.latitude);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    //위치 찾는거 실패했을 때 들고오는 함수
    console.log('cant excess geolocation');
}

function askForCoords() {
    //navigator API를 이용할 거임.
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);

}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        console.log(parsedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();