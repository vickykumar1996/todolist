

if(localStorage.getItem("tasklist")==null)
{
    localStorage.setItem("tasklist" , "[]");
}

function addTask()
{
    let newTask = {
        taskname : document.getElementById("inp").value,
        status : false
    }
    let tasklist = JSON.parse(localStorage.getItem("tasklist"));

    // logic to avoid duplicates
    let isPresent = tasklist.some((v)=>{ return v.taskname.toUpperCase() == newTask.taskname.toUpperCase()});
    if(isPresent==false)
    {
        tasklist.push(newTask);
        tasklist = JSON.stringify(tasklist);
        localStorage.setItem("tasklist" , tasklist)
        alert("New task added");
        // refresh the parent and insert child again
        let parent = document.getElementById("task-list");
        parent.innerHTML = ""
        document.getElementById("inp").value = ""
        displayAllTask();
    }
    else
    {
        alert("task already present !!")
    }
}

function displayAllTask()
{
    let tasklist = JSON.parse(localStorage.getItem("tasklist"));

    let parent = document.getElementById("task-list");

    for (let i = 0; i < tasklist.length; i++) 
    {
        let div = document.createElement("div");
        div.setAttribute("class" , "task");

        div.innerHTML = `<div class="details">
                            <button onclick="updatestatus()" tname="${tasklist[i].taskname}">
                                <i class='bx bx-check' tname="${tasklist[i].taskname}"></i>
                            </button>
                            <span> ${tasklist[i].taskname} </span>
                        </div>
                        <button onclick="deleteTask()" tname="${tasklist[i].taskname}">
                            <i class='bx bx-x' tname="${tasklist[i].taskname}"></i> 
                        </button>`

        if(tasklist[i].status==true)
        {
            div.classList.add("completed")
        }

        parent.append(div); 
        
    }
}
displayAllTask()


function deleteTask()
{
    let btn = event.target;
    let taskToBeDeleted = btn.getAttribute("tname");

    let tasklist = JSON.parse(localStorage.getItem("tasklist"));

    let i =  tasklist.findIndex((v)=>{return v.taskname==taskToBeDeleted});
    
    tasklist.splice(i , 1);

    localStorage.setItem("tasklist" , JSON.stringify(tasklist));

    alert("Task has been removed");

    // update in UI
    let parent = document.getElementById("task-list");
    parent.innerHTML = ""

    displayAllTask();
}


function updatestatus()
{
    let btn = event.target;
    let taskToBeUpdated = btn.getAttribute("tname");

    let tasklist = JSON.parse(localStorage.getItem("tasklist"));

    let i = tasklist.findIndex((v)=>{ return v.taskname==taskToBeUpdated});

    if(tasklist[i].status == false)
    {
        tasklist[i].status = true;
    }
    else
    {
        tasklist[i].status = false;
    }

    localStorage.setItem("tasklist" , JSON.stringify(tasklist));

    let parent = document.getElementById("task-list");
    parent.innerHTML = ""
    document.getElementById("inp").value = ""
    displayAllTask();
}