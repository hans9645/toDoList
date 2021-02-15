const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");
//const라서 충돌하기때문에 이름을 바꿔줘야한다. form->toDoform이런식

const TODOS_LS = 'toDos';

let toDos = [];


function deleteTodo(event) {

    //console.dir(event.target); 에서 부모노드를 찾는다.
    //console.log(event.target.parentNode);

    const btn = event.target;
    const p_li = btn.parentNode;
    toDoList.removeChild(p_li); //보이는 것만 삭제한다. 아직 배열자체는 건드리지않아서 새로고침시 돌아옴.
    const cleanToDos = toDos.filter(function(toDo) {
        console.log(toDo.id,p_li.id);
        return toDo.id !== parseInt(p_li.id);//string을 int로 변환
    }); //filter나 forEach는 배열의 모든 원소를 한바퀴 놀면서 실행시키기때문에
    //선언을 하지 않은 파라미터 인자를 넣어줄 수 있는거다.
    
    //console.log(cleanToDos);

    toDos=cleanToDos;
    saveToDos();//변화한 toDos를 저장.
}

function loadToDos() {

    const loadedtoDo = localStorage.getItem(TODOS_LS);
    if (loadedtoDo != null) {
        const parsedTodos = JSON.parse(loadedtoDo);
        //console.log(parsedTodos);
        parsedTodos.forEach(function (toDo) {
            //console.log(toDo.text);
            paintToDo(toDo.text);
        });
        //foreach array에 들어있는 걸 하나씩 실행시켜준다.
        //lamda함수로 바로 생성해서 실행시킴. 

    }
}

function saveToDos() {
    //localStorage.setItem(TODOS_LS, toDos);
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    //자바스크립트의 localStorage의 경우에는 object를 바로 저장할 수가 없다.
    // 따라서 스트링 형태로 바꿔주고 저장을 해야하는데
    //이 때 JSON.stringify()를 사용한다. 어떠힌 object도 스트링으로 바꿔준다.
    //JSON(Javascript Object Notation)
}

function paintToDo(text) {
    //console.log(text);
    const potato_li = document.createElement("li"); //root
    const delBtn = document.createElement("button"); //1
    const span = document.createElement("span"); //2
    const newId = Date.now();//id가 랜덤으로 배정되서 유니크해지니까 편리하다.

    delBtn.innerText = "❌x";
    delBtn.addEventListener("click", deleteTodo);
    span.innerText = text;
    potato_li.appendChild(delBtn);
    potato_li.appendChild(span);
    potato_li.id = newId;
    toDoList.appendChild(potato_li);
    //html문서와 맞지 않을경우 appendchild가 위치를 못찾아서 
    //부모노드가 null이라는 경고를 해버림

    const toDoObj = { //object를 생성해서 나중에 변수를 사용할 수 있다.
        text: text,
        id: newId
        //구조체 처럼 선언해서 사용할 수 있는데 안쪽에는 세미콜론은 필요없다.
    };

    toDos.push(toDoObj);
    saveToDos();
    //console.log(toDos);

}

function handleSubmit(event) {
    event.preventDefault(); //새로운 창을 금방띄워버리는걸 막으려고
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = ""; //입력된 값을 지워버러림.
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();