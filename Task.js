let TaskInput  = document.getElementById("TaskInput");
let addButton = document.getElementById("AddButton");
let TaskList = document.getElementById("taskList");

let Tasks = []; //array to hold tasks
loadTasks();
renderTasks();

function task(name){
    this.id = Date.now();
    this.name = name;
    this.completed = false;
    this.date = new Date().toISOString().split("T")[0];
}


//event listener for add button
addButton.addEventListener("click",()=>{
    const value = TaskInput.value.trim();
    if(value !== ""){
        const newTask = new task(value);
        Tasks.push(newTask);
        console.log(`Task Added : ${newTask.name}`);
        TaskInput.value = "";
        saveTask();
        renderTasks();
    }
    else{
        alert("Task name cannot be empty");
    }
 
})


//function to render tasks
function renderTasks(){
   
    TaskList.innerHTML = Tasks.slice().reverse().map(task=>{
    return ` <div id="${task.id}" class="Task-container ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="Task-Checkbox NoEffect" ${task.completed ? 'checked' : ''}>
                 <input type="text" class="TaskName Task-Text" value="${task.name}" disabled>
                 <button  class="Save-button " style="visibility:hidden;">Save</button>
                <button  class="Edit-Button">EDIT</button>
                <button class="Delete-Button NoEffect">DEl</button>
             </div>`
    }).join('');
     
}


//Delete , check completed , edit task 
TaskList.addEventListener("click",(e)=>{
    //delete task
    if(e.target.classList.contains("Delete-Button")){ 
        const taskId = e.target.parentElement.id;
        const task = Tasks.find(t => t.id == taskId);
        deleteTask(task);
    }
    //check completed or not
    else if(e.target.type === "checkbox")
        {
            setstatusCompletion(e);
    }
    //edit task
    else if(e.target.classList.contains("Edit-Button")){
        const editbtn = e.target;
        EditName(e);
      
        editbtn.style.visibility = "hidden";
        const deletebtn = e.target.parentElement.querySelector(".Delete-Button");
        deletebtn.style.visibility = "hidden";
    }
    else{
        return;
    }
});
//function to set task completion status
function setstatusCompletion(e){
    if(e.target.checked){
                const task = Tasks.find(t => t.id == e.target.parentElement.id);
                task.completed = true;
                console.log(`Task ${task.name} marked as completed`);
                e.target.parentElement.classList.add("completed");
            }
            else{
                const task = Tasks.find(t => t.id == e.target.parentElement.id);
                task.completed =false;
                console.log(`Task ${task} marked as incomplete`);
                e.target.parentElement.classList.remove("completed");
            }   
}
//function to delete task with id
function deleteTask(task){
    
    const id = task.id;
    Tasks = Tasks.filter(task => task.id != id);
    console.log(`task ${task.name} deleted`);
    saveTask();
    renderTasks();
}
//function to edit task name with task object and event
function EditName(e){
    const taskId = e.target.parentElement.id;
    const task = Tasks.find(t => t.id == taskId);
    const TaskName = e.target.parentElement.querySelector(".TaskName");
    TaskName.disabled = false;
    const savebtn = e.target.parentElement.querySelector(".Save-button");
    savebtn.style.visibility = "visible";
    
    
    
     savebtn.addEventListener("click",()=>{
            
            if(TaskName.value !== ""){
                newName = TaskName.value;
                task.name = newName.trim();
                console.log(`New name entered: ${newName}`);
                TaskName.disabled = true;
                console.log(`Task  renamed to ${task.name}`);
                saveTask();
                e.target.style.visibility = "visible";
                const deletebtn = e.target.parentElement.querySelector(".Delete-Button");
                deletebtn.style.visibility = "visible";
                savebtn.style.visibility = "hidden";
            }
            else{
                alert("Task name cannot be empty");
            }
        
      
          });

           
}

function saveTask(){
    localStorage.setItem("Tasks",JSON.stringify(Tasks));
    console.log('saved')
}

function loadTasks() {
  const storedTasks = localStorage.getItem("Tasks");

  if (storedTasks) {
    Tasks = JSON.parse(storedTasks);
  } else {
    Tasks = [];
  }
}
