const form = document.querySelector('.form')
const inputText = document.querySelector('.inputText')
const tasksList = document.querySelector('.tasksList')
const emptyList = document.querySelector('.emptyList')

//вызов функций
form.addEventListener('submit', addTask)
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)

let tasks = [];

//localStorage.getItem('tasks') возвращает строку с данными в localStorage
if(localStorage.getItem('tasks')){
    //JSON.parse переводит строку в массив js
    tasks = JSON.parse(localStorage.getItem('tasks'));
    //выводим элементы массива в разметку
    /*tasks.forEach(function (task) {
        renderTask(task)
    });*/

    //forEach как стрелочная функция
    tasks.forEach((task) => renderTask(task));
}

checkEmptyList()

function addTask(event){
    event.preventDefault()
    const taskText = inputText.value

    //описываем объект с задачей
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    }

    //добавляем объект в конец массива
    tasks.push(newTask);

    //сохранение массива в LocalStorage браузера
    saveToLocalStorage()

    //отображение задач на странице
    renderTask(newTask)

    inputText.value = ''
    inputText.focus()
    checkEmptyList()
}

function deleteTask(event){
    //отображение в консоли элемента по которому произлшел клик
    //console.log(event.target)
    if(event.target.dataset.action !== "delete") return
    const parentNode = event.target.closest(".delo")

    //вывод в консоль id li элемента
    //console.log(parentNode.id);

    //в константу id записываем id элемента и приводим его к числу
    const id = Number(parentNode.id);

    //метод findIndex ищет индекс элемента в массиве
    /*const index = tasks.findIndex(function (task) {
        if(task.id === id) {
            return true;
        }
    })*/

    //стрелочная функция с findIndex
    //const index = tasks.findIndex((task) => task.id === id);

    //метод splice вырезает из массива элементы начиная с номера index в количестве одного элемента
    //tasks.splice(index, 1);

    //удаление элементов массива путем фильтрации массива. Изначально массив должен быть объявлен как let
    /*tasks = tasks.filter(function (task) {
        if (task.id === id) {
            return false;
        } else {
            return true;
        }
    })*/

    //стрелочная функция с filter
    tasks = tasks.filter((task) => task.id !== id);

    //сохранение массива в LocalStorage браузера
    saveToLocalStorage()

    parentNode.remove()

    checkEmptyList()
}

function doneTask(event){
    if(event.target.dataset.action !== "done") return
    const parentNode = event.target.closest(".delo")

    const id = Number(parentNode.id);

    //метод find ищет элемент в массиве, здесь мы ищем по свойству id. В переменную task записываем элемент массива
    /*const task = tasks.find(function (task) {
        if(task.id === id) {
            return true;
        }
    })*/

    //стрелочная функция для метода find
    const task = tasks.find((task) => task.id === id);
    //меняем статус задачи в массиве объектов на противоположный
    task.done = !task.done;
    
    //сохранение массива в LocalStorage браузера
    saveToLocalStorage()


    titleTask = parentNode.querySelector("span")
    titleTask.classList.toggle("titleTaskDone")
}

function checkEmptyList(){
    //если массив с задачами пустой, добавляем блок с классом emptyList
    if(tasks.length === 0) {
        const emptyListHTML = `<p class="emptyList">Список дел пуст</p>`;
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
    }
    if(tasks.length > 0) {
        //если массив с задачами не пустой, находим блок с классом .emptyList и удаляем его 
        const emptyListEl = document.querySelector('.emptyList');
        /*if(emptyListEl) {
            emptyListEl.remove();
        }*/

        //тернарный опрератор для удаления элемента с классом .emptyList
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//функция для отображение задач на странице
function renderTask(task) {
    //если task.done = true то в cssClass = "titleTaskDone", если false то в cssClass = "titleTask" 
    const cssClass = task.done ? "titleTaskDone" : "titleTask";
    const taskHtml = `<li id="${task.id}" class="delo"><span class="${cssClass}">${task.text}</span><button type="submit" data-action="done">Сделано</button>
            <button type="submit" data-action="delete">Удалить</button></li>`
    tasksList.insertAdjacentHTML('beforeend', taskHtml)
}