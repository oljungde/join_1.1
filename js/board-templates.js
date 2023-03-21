/**
 * renders the Task-Card on the Board
 * @param {*} element - information about the current task
 * @returns the html code for rendering the task-card on the board
 */
function generateTodoHTML(element) {
    return /*html*/`
    <div id="${element['id']}" onclick="checkDevice()" draggable="true" ondragstart="startDragging(${element['id']})" class="todo">
        <div id="task-menu-${element.id}" class="task-menu display-none">
            <div ontouchstart="showDetailWindow(${element.id})" class="task-menu-edit">Edit</div>
            <div id="touch-move-${element.id}" class="task-menu-move">Move to:</div>
        </div>

        <button class="${element['category']['TaskColor']}">${element['category']['Category']}</button>

        <h4>${element['title']}</h4>
        <div class="text">${element['description']}</div>
        
        <div id="task_progress_${element['id']}" class="task-progress"></div>

        <div id="user_and_priority" class="user-priority">
            <div id="contacts${element['id']}" class="contacts-in-task"></div>
            <div class="priority"><img src="assets/img/prio-${element['priority']}.png" alt=""></div>
        </div>
    </div>`;
}


/**
 * code to render the progress bar of the current task
 * @param {number} taskId is the id of the current task
 * @returns the html code to render the progress bar
 */
function progressBarTemplate(taskId) {
    return /*html*/ `
        <div class="progress-bar">
            <div id="fill${taskId}" class="progress-bar-fill"></div>
        </div>
        <span id="fill-text${taskId}" class="progress-bar-text"> Done</span>
    `;
}


/**
 * HTML code for render ads of drop areas
 * @param {string} status is a value from a status of a drag area
 * @returns the HTML code to render the ad of drop containers
 */
function dropTemplateHTML(status) {
    return /*html*/ `
        <div id="drop_template_${status}" class="drag-template display-none"></div>
    `;
}


/**
 * code to display to entries of the touch overlay context menu
 * @param {object} element is the current Task
 * @param {string} currentTaskState is the new status of task to move 
 * @param {number} i is the position of array taskStatesName to display the full name of the new status in the touch overlay
 * @returns the HTML code to render an entry ov touch overlay to wird with current task
 */
function touchMenuEntryHTML(element, currentTaskState, i) {
    return /*html*/ `
        <div ontouchstart="touchMoveTask(${element.id}, '${currentTaskState}')" class="task-menu-move-entry">${taskStatesNames[i]}</div>
    `;
}


/**
 * @returns the html code for rendering the task details window
 */
function detailContentTemplate() {
    return /*html*/`
        <img onclick="hideAddTaskMask()" src="assets/img/close.png" alt="Close" class="close-cross" >
        <button class="detail-category ${currentTask.category.TaskColor}">
            ${currentTask.category.Category}
        </button>

        <h2 class="detail-title">${currentTask.title}</h2>
        <div class="detail-text">
            ${currentTask.description}
        </div>

        <div class="detail-entry"> 
            <h4>Due date:</h4>  
            ${currentTask.dueDate}
        </div>

        <div class="detail-entry">
            <h4> Priority:</h4> 
            <img src="assets/img/detail-prio-${currentTask.priority}.png" alt="">
        </div>

        <div class="detail-assigned"> 
            <h4>Assigned To:</h4> 
            <div id="detail_assigned_contacts"></div> 
        </div>

        <img id="edit_button" onclick="changeTask(${currentTask.id})" src="assets/img/edit-button.png"  class="edit-button pointer">
        <div id="detail_subTasks" class="detail-subTasks">
            <h4>Subtasks:</h4>
        </div>
    `;
}


/**
 * 
 * @returns the html code for the change Task mask
 */
function changeTaskTemplate(id) {
    return /*html*/`
        <form onsubmit="saveChangedTask(${currentTask.id}); return false;" class="editTask">
            <img onclick="hideAddTaskMask()" src="assets/img/close.png" alt="" class="close-cross">
        
            <div class="input-container">
                <input id="changed_title" type="text" value="${currentTask.title}" autocomplete="off" required class="add-task-title">
            </div>

            <div>
                <h4>Description</h4>
                <textarea id="changed_description" placeholder="Enter a Description" class="add-description" >${currentTask.description.replace(/<br\s*\/?>/ig, "")}</textarea>
            </div>

            <h4>Due Date</h4>
            <div class="input-container">
                <input id="add-date" value="${currentTask.dueDate}" type="date" class="add-task-due-date">
            </div>

            <div class="priority-container">
                <div id="priority_urgent" onclick="selectedPriority(1)" class="priority-urgent">
                    <p>Urgent</p> 
                    <img id="priority_img_urgent" src="assets/img/prio-urgent.png" alt="">
                </div>

                <div id="priority_medium" onclick="selectedPriority(2)" class="priority-medium">
                    <p>Medium</p> 
                    <img id="priority_img_medium" src="./assets/img/prio-medium.png" alt="">
                </div>
                
                <div id="priority_low" onclick="selectedPriority(3)" class="priority-low" >
                    <p>Low</p> 
                    <img id="priority_img_low" src="./assets/img/prio-low.png" alt="">
                </div>
            </div>

            <div id="user_selector">
                <div onclick="showUsers(${currentTask.id})" class="selector-header" >
                    Select contacts to assign
                    <img src="assets/img/blue-dropdown-arrow.png" alt="">
                </div>
            </div>
            <div id="selector_user_dropdown"></div>
            <div id="selector_user_dropdown_contact" class="contacts-in-task"></div>

            <h4>Subtasks:</h4>
            <div id="edit_subTasks2" class="detail-subTasks" >
                <div id="empty_subtask_text"></div>

                <div class="input-container">
                    <input id="new_subtask_text" type="text" placeholder="Add new subtask" class="input border-bottom" >
                    <div class="checkAndCrossIconsCategory">
                        <img onclick="clearSubTasks()" src="./assets/img/blue-cross.png" class="blue-cross pointer">
                        <img src="./assets/img/devider.png">
                        <img onclick="newSubTask(${id})" src="./assets/img/blue-check.png" class="blue-check pointer">
                    </div>
                </div>
                <div id="edit_subTasks">
  
                </div>
            </div>

            <div class="task-edit-btns">
                <div onclick="deleteTask(${currentTask.id})" class="btn trash-button"><img class="trash" src="assets/img/trash.ico" alt=""></div>
                <button class="btn ok">Ok <img src="assets/img/white-check.png" alt=""></button>
            </div>
        </form>
    `;
}


/**
 * code render a single subtask on the detail view of a task
 * @param {object} currentSubTask ist the currentsubtask to show
 * @param {number} assignedSubTaskIndex is the index of the current subtask from current subtasks
 * @param {number} id is the id of the current task
 * @returns the html code to show the current subtask on the detail view for the whole task
 */
function renderAssignedSubTasksTemplate(currentSubTask, assignedSubTaskIndex, id) {
    return /*html*/ `
        <div>
            <input id="subTask_${assignedSubTaskIndex}" onchange="setSubTaskDone(${id}, ${assignedSubTaskIndex})" type="checkbox" class="pointer">    
            <span id="subTask_title_${assignedSubTaskIndex}">${currentSubTask.title}</span>
        </div>
    `;
}


/**
 * code render a single subtask on edit task mask
 * @param {object} currentSubTask ist the currentsubtask to show
 * @param {number} assignedSubTaskIndex is the index of the current subtask from current subtasks
 * @param {number} id is the id of the current task
 * @returns the html code to show the current subtask on edit mask for the whole task
 */
function editShowSubTasksTemplate(currentSubTask, assignedSubTaskIndex, id) {
    return /*html*/ `
        <div id="${assignedSubTaskIndex}" class="subtasks" >  
          <input id="subTask_${assignedSubTaskIndex}" onchange="setSubTaskDone(${id})" type="checkbox" class="subtaskCheckbox pointer">
          <span id="subTask_title_${assignedSubTaskIndex}">${currentSubTask.title}</span>
          <img src="./assets/img/trash-blue.png" onclick="deleteSubTask(${id}, ${assignedSubTaskIndex})" alt="trash" class="subtasks-trash"> 
        </div>
    `;
}