const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todolist");
const deleteAllBtn = document.querySelector(".footer button");
const pendingNumb = document.getElementById("pendingNumb");

inputBox.addEventListener('keyup', () =>{
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
    let getLocalStorage = localStorage.getItem("New todo");
    if(getLocalStorage == null){
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("New todo", JSON.stringify(listArr));
    addBtn.classList.remove("active");
    showTasks();
});

function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    localStorage.setItem("New todo", JSON.stringify(listArr));
    showTasks();
}

deleteAllBtn.addEventListener("click", () =>{
    listArr = [];
    localStorage.setItem("New todo", JSON.stringify(listArr));
    showTasks();
});

function showTasks(){
    let getLocalStorage = localStorage.getItem("New todo");

    if(getLocalStorage == null){
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);   
    }

    pendingNumb.innerText = listArr.length;
    if(listArr.length >0){
        deleteAllBtn.classList.add('active');
    }else{
        deleteAllBtn.classList.remove('active');
    }

    let newLiTag = '';
    listArr.forEach((element, index) =>{
        newLiTag += `<li>${element}<span onClick="deleteTask(${index})"><i class="fas fa-trash"></i></span>  </li>`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";
}



