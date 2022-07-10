// Se seleccionan los contenedores de HTML para incluír las fechas
const dateNumber = document.getElementById('dateNumber')
const dateText = document.getElementById('dateText')
const dateMonth = document.getElementById('dateMonth')
const dateYear = document.getElementById('dateYear')

// Se selecciona el div que contendrá todas las tareas
const taskContainer = document.getElementById('taskContainer')

Sortable.create(taskContainer, {})

//Función que genera la fecha actual y los muestra en los contenedores seleccionados anteriormente
const setDate = () => {
    const date = new Date()
    dateNumber.textContent = date.toLocaleString('es', {day: 'numeric'})
    dateText.textContent = date.toLocaleString('es', {weekday: 'long'})
    dateMonth.textContent = date.toLocaleString('es', {month: 'short'})
    dateYear.textContent = date.toLocaleString('es', {year: 'numeric'})
}


// Función que genera una nueva tarea, al ser un formulario, primero detiene su comportamiento por default. Guarda el valor insertado por el usuario en un div y lo guarda en el contenedor de tareas, además agrega la función changeTaskState en cada una de las tareas que se dispararán con un click
const addNewTask = event => {
    event.preventDefault()
    const { value } = event.target.taskText
    if(!value) return
    const task = document.createElement('div')
    task.classList.add('task', 'roundBorder')
    task.addEventListener('click', changeTaskState)
    task.textContent = value
    taskContainer.prepend(task)
    event.target.reset()
    createBtn(task)   
}

//Función que cra el boton, dandóle el ícono, vincula la funcion deleteElement a ese boton y luego lo inserta en el contenedor de la tarea
const createBtn = (element) => {
    const btn = document.createElement('i')
    btn.classList.add('bx', 'bxs-trash')
    btn.addEventListener('click', deleteElement)
    element.appendChild(btn)
}

//Función que selecciona el padre del elemento clikeado y lo elimina
const deleteElement = (element) => {
    element.target.parentElement.remove()
}

// Función dada a cada tarea que activa o desactiva la clase css done
const changeTaskState = event => {
    event.target.classList.toggle('done')
}

//Función que crea dos array. uno con las tareas hechas y otro con las tareas por hacer. Itera los hijos del contenedor con las tareas y en base a si contienen la clase done los agrupa en uno de los arrays creados, luego retorna una copia de esos arrays, primero el de tareas por hacer y luego el de hechas
const order = (string) => {
    const done = []
    const toDo = []
    taskContainer.childNodes.forEach( el => {
        el.classList.contains('done') ? done.push(el) : toDo.push(el)
    })
    if (string == "toDo"){
        return [...toDo, ...done]
    }
    else if (string == "done"){
        return [...done, ...toDo]
    }
}


// Función que llama a la funcion order, itera el array devuelto y crea un hijo en el contenedor de tareas por cada item del array
const renderOrderedTask = (string) => {
    order(string).forEach( el => taskContainer.appendChild(el))
}


// Función que genera una nueva fecha, se actualiza cada vez que se carga el documento
setDate()


// Funcionalidades extra, se puede eliminar definitivamente una tarea, se pueden ordenar por completadas o por hacer y se pueden arrastrar tareas.