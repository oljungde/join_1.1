let currentDraggedElement;
let alreadyEmpty = true;
let filteredTasks = [];
let currentTask = {};
let isTouchDevice = false;
let taskStates = ['toDo', 'inProgress', 'awaitingFeedback', 'done'];
let taskStatesNames = ['To do', 'In Progress', 'Awaiting Feedback', 'Done'];


/**
 * init board function gets the global init function from script.js, checks if user is logged in
 * gets the tasks from current user, init the rendering of the tasks
 */
async function initBoard() {
    await init();
    setNavLinkActive();
    checkUserIsLoggedIn();
    getTasksOfCurrentUser();
    handleFilterTasks();
    imgheader();
    checkDevice();
}


/**
 * get the tasks of the current user
 */
function getTasksOfCurrentUser() {
    currentUserTasks = currentUser.tasks;
}


/**
 * checks if search input is empty or not and filter the tasks, and calls the function to get the tasks by thier status
 */
function handleFilterTasks() {
    let search = document.getElementById('search_input').value;
    let searchTerm = search.toLowerCase();
    if (searchTerm.length == 0) {
        filteredTasks = currentUserTasks;
        filterTasksByStatus();
    } else {
        filteredTasks = currentUserTasks.filter(filteredTasks => {
            return filteredTasks.title.toLowerCase().includes(searchTerm) || filteredTasks.description.toLowerCase().includes(searchTerm);
        })
        filterTasksByStatus();
    }
}


/**
 * filter all Tasks by thier status and created new arrays for each status, calls reset board function and calls function to render the board
 */
function filterTasksByStatus() {
    let statusTodo = filteredTasks.filter(task => task.status == 'toDo');
    let statusInProgress = filteredTasks.filter(task => task.status == 'inProgress');
    let statusAwaitingFeedback = filteredTasks.filter(task => task.status == 'awaitingFeedback');
    let statusDone = filteredTasks.filter(task => task.status == 'done');
    resetBoard();
    renderBoard(statusTodo, statusInProgress, statusAwaitingFeedback, statusDone);
}


/**
 * reset the board and deletes all tasks from the html code
 */
function resetBoard() {
    document.getElementById('toDo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('awaitingFeedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}


/**
 * renders all tasks by status
 * @param {string} toDo all tasks with status todo
 * @param {string} inProgress all tasks with status inProgress
 * @param {string} awaitingFeedback all tasks with status awaitingFeedback
 * @param {string} done all tasks with status done
 */
function renderBoard(toDo, inProgress, awaitingFeedback, done) {
    renderTasks(toDo);
    renderTasks(inProgress);
    renderTasks(awaitingFeedback);
    renderTasks(done);
    renderDropTemplate('toDo');
    renderDropTemplate('inProgress');
    renderDropTemplate('awaitingFeedback');
    renderDropTemplate('done');
    checkDevice();
}


/**
 * renders a single task    
 * @param {string} status of the single task
 */
function renderTasks(status) {
    for (let index = 0; index < status.length; index++) {
        const element = status[index];
        let taskStatus = element.status;
        document.getElementById(taskStatus).innerHTML += generateTodoHTML(element);
        renderProgressBar(element)
        renderContactInTask(element);
        renderTouchMove(element);
    }
}


/**
 * renders the menu entries on context menu if using touch device
 * @param {object} element is the current Task
 */
function renderTouchMove(element) {
    let taskMenu = document.getElementById(`task-menu-${element.id}`);
    for (let i = 0; i < taskStates.length; i++) {
        const currentTaskState = taskStates[i];
        if (element.status != currentTaskState) {
            taskMenu.innerHTML += touchMenuEntryHTML(element, currentTaskState, i);
        }
    }
}


/**
 * renders the area to drob a tragged task
 * @param {string} status is the value for the status of drag area
 */
function renderDropTemplate(status) {
    document.getElementById(status).innerHTML += dropTemplateHTML(status);
}


/**
 * renders the contacts in the task
 * @param {*} element 
 */
function renderContactInTask(element) {
    for (let i = 0; i < element.user.length; i++) {
        let letter = element.user[i]['contactInitials'];
        let color = element.user[i]['concolor'];
        let id = element.id;
        document.getElementById("contacts" + id).innerHTML += /*html*/`
        <div style="background-color: ${color}" class="user">${letter}</div>
        `;
    }
}


/**
 * determines how many subtasks are present, how many of them are done, and renders the progressbar
 * @param {object} element is the current task
 */
function renderProgressBar(element) {
    let subTasksInTask = element.subTasks;
    let subTasksInTasksDone = subTasksInTask.filter((subTasksInTasksDone) => {
        return subTasksInTasksDone.done == true;
    });
    let taskId = element.id;
    if (subTasksInTask.length > 0) {
        let taskProgressContainer = document.getElementById('task_progress_' + taskId);
        taskProgressContainer.innerHTML += progressBarTemplate(taskId);
        let fill = document.getElementById('fill' + taskId);
        let fillText = document.getElementById('fill-text' + taskId);
        fill.style.width = `${subTasksInTasksDone.length / subTasksInTask.length * 100}%`;
        fillText.innerHTML = `${subTasksInTasksDone.length}/${subTasksInTask.length} Done`;
    }
}


/**
 * defines the dragged task
 * @param {number} id - id for idintifying the dragged task
 */
function startDragging(id) {
    for (i = 0; i < currentUserTasks.length; i++) {
        let index = currentUserTasks[i]['id'];
        if (index == id) {
            currentDraggedElement = i;
        }
    }
}


/**
 * Allows the task to be dropped
 * @param {*} ev - This is the event
 */
function allowDrop(ev) {
    ev.preventDefault();
    let status = currentUserTasks[currentDraggedElement]['status'];
    let dragTemplates = document.querySelectorAll('.drag-template');
    dragTemplates.forEach(dragTemplate => {
        dragTemplate.classList.add('drag-template-start');
        dragTemplate.classList.remove('display-none');
        document.getElementById(`drop_template_${status}`).classList.add('display-none');
    });
}


/**
 * changes the status of the task according to the dropped area
 * @param {*} status - This is the status of the Task on the board
 */
async function moveTo(status) {
    currentUserTasks[currentDraggedElement]['status'] = status;
    filterTasksByStatus();
    await backend.setItem('users', JSON.stringify(users));
}


/**
 * check if user use a touch device, for work with a single task
 */
function checkDevice() {
    let allTaskContainer = document.querySelectorAll('.todo');
    allTaskContainer.forEach(taskContainer => {
        taskContainer.addEventListener('touchstart', function (event) {
            onlyTouch(event, taskContainer);
        }, false);
        taskContainer.addEventListener('click', function (event) {
            onlyClick(event, taskContainer);
        }, false);
    });
}


/**
 * show the context for touch devices 
 * @param {object} eve is the event from an event Listener when user use a touch device 
 * @param {object} taskContainer html object wich contains the context menu for working with tasks on a touch device
 */
function onlyTouch(eve, taskContainer) {
    showTaskTouchMenu(taskContainer.id);
    eve.preventDefault();
}


/**
 * shows the detail window of a task when user don#t use a touch device
 * @param {object} eve is the event from an event Listener when user use not a touch device 
 * @param {object} taskContainer html object wich contains the context menu for working with tasks on desktop   
 */
function onlyClick(eve, taskContainer) {
    showDetailWindow(taskContainer.id);
    eve.preventDefault();
}


/**
 * shows the context menu for several seconds 
 * @param {number} id is the if of the current task
 */
function showTaskTouchMenu(id) {
    let taskMenu = document.getElementById(`task-menu-${id}`);
    taskMenu.classList.remove('display-none');
    setTimeout(() => {
        taskMenu.classList.add('display-none');
    }, 3000);
}


/**
 * change the status of the current task by using a touch device
 * @param {number} id is the id if current task
 * @param {*} moveTo is the new status of current task to move 
 */
async function touchMoveTask(id, moveTo) {
    currentTask = currentUserTasks.filter((currentTask) => {
        return currentTask.id == id;
    });
    currentTask = currentTask[0];
    currentTask.status = moveTo;
    await backend.setItem('users', JSON.stringify(users));
    handleFilterTasks();
    checkDevice();
}


/**
 * open the task details
 * @param {number} id is the uniqe id from the array entry of the task
 */
function showDetailWindow(id) {
    let detailContainer = document.getElementById('add-task-overlay');
    let detailContent = document.getElementById('detail_content');
    document.getElementById('add-task-container').classList.add('display-none');
    for (let filteredTasksIndex = 0; filteredTasksIndex < filteredTasks.length; filteredTasksIndex++) {
        currentTask = filteredTasks[filteredTasksIndex];
        if (currentTask.id == id) {
            detailContent.classList.remove('display-none');
            detailContainer.classList.remove('display-none');
            detailContent.innerHTML = detailContentTemplate();
            renderAssignedContactsDetails();
            renderAssignedSubTasks(id);
        }
    }
}


/**
 * renders the assigned contacts from the current task
 */
function renderAssignedContactsDetails() {
    let detailAssignedContacts = document.getElementById('detail_assigned_contacts');
    for (let assignedContactsIndex = 0; assignedContactsIndex < currentTask.user.length; assignedContactsIndex++) {
        let letter = currentTask.user[assignedContactsIndex]['contactInitials'];
        let color = currentTask.user[assignedContactsIndex]['concolor'];
        let name = currentTask.user[assignedContactsIndex]['contactName'];
        detailAssignedContacts.innerHTML +=/*html*/ `
        <div class="detail-contact">
        <div style="background-color: ${color}" class="user">${letter}</div>
        <div>${name}</div>
        </div>
        `;
    }
}


/**
 * renders the mask for editing an existing task
 * @param {number} id - The unique id of the task for identifiying the current task
 */
function changeTask(id) {
    let detailContent = document.getElementById('detail_content');
    for (let filteredTasksIndex = 0; filteredTasksIndex < filteredTasks.length; filteredTasksIndex++) {
        currentTask = filteredTasks[filteredTasksIndex];
        if (currentTask.id == id) {
            userSelect = currentTask.user;
            detailContent.innerHTML = changeTaskTemplate(id);
            editShowSelectedPriority();
            editShowSubTasks(id);
        }
    }
    getToday();
}


/**
 * saves the current task if it was edit
 * @param {number} currentTaskId is the id from the current task to save
 */
async function saveChangedTask(currentTaskId) {
    selectorContactIndex = 0;
    let changedTitle = document.getElementById('changed_title').value;
    let changedDescription = document.getElementById('changed_description').value.replace(/\n/g, "<br>\n");
    let changedDueDate = document.getElementById('add-date').value;
    let taskToChange = filteredTasks.find((taskId) => taskId.id == currentTaskId);
    taskToChange.user = [];
    taskToChange.user = userSelect;
    taskToChange.title = changedTitle;
    taskToChange.description = changedDescription;
    taskToChange.dueDate = changedDueDate;
    taskToChange.priority = prioritySelect;
    userSelect = [];
    prioritySelect = [];
    await backend.setItem('users', JSON.stringify(users));
    hideAddTaskMask();
}


/**
 * deletes the current showing task
 * @param {number} currentTaskId is the id of the current task
 */
async function deleteTask(currentTaskId) {
    let taskToDelete = filteredTasks.findIndex((taskId) => taskId.id == currentTaskId);
    filteredTasks.splice(taskToDelete, 1);
    await backend.setItem('users', JSON.stringify(users));
    prioritySelect = [];
    taskCategoryFinaly = [];
    hideAddTaskMask();
}


/**
 * Closes the Detail Window
 */
function closeDetailTask() {
    userSelect = [];
    document.getElementById('detail_content').innerHTML = '';
    document.getElementById('detail_container').classList.add('display-none');
    filterTasksByStatus();
    checkDevice();
}


/**
 * Hiding the add Task
 */
function hideAddTaskMask() {
    setTimeout(() => {
        document.getElementById("add-task-overlay").classList.add("display-none");
        document.getElementById('AddTaskMaskContact').classList.add("display-none");
        document.getElementById('AddTaskMaskContact').classList.add("display-none");
    }, 250);
    handleFilterTasks();
    checkDevice();
}


/**
 * prevents sevaral div container for closing by click on the background div
 * @param {object} event is a click event
 */
function doNotClose(event) {
    event.stopPropagation();
}