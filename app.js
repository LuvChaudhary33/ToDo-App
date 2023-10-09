const addBtn = document.querySelector(".inputField button");
const inputBox = document.querySelector(".inputField input");
const todoList = document.querySelector(".todolist");
const deleteAllBtn = document.querySelector(".footer button");
const pendingNumb = document.getElementById('pendingNumb');

let count = 0;

inputBox.addEventListener("keyup", () =>{
    let userData = inputBox.value;
    if(userData.trim()){
        addBtn.classList.add("active");
    }else{
        addBtn.classList.remove("active");
    }
});
showTasks();

addBtn.addEventListener("click", () =>{
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage === null){
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    addBtn.classList.remove("active");
    showTasks();
});

function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage === null){
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);
    }

    pendingNumb.textContent = listArr.length;

    if(listArr.length > 0){
        deleteAllBtn.classList.add('active');
    }else{
        deleteAllBtn.classList.remove('active');
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li>${element}<input type="checkbox" onClick="strike(this)"><span onClick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";
}

function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}

deleteAllBtn.onclick = () =>{
    listArr = [];
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}

function strike(elem){
    if(elem.checked){
        elem.parentElement.style.textDecoration = "line-through";
    }else{
        elem.parentElement.style.textDecoration = "none";
    }
}

