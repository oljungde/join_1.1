/**
 * renders all subtasks of a task in the detail view of a task
 * @param {number} id is the id of a task
 */
function renderAssignedSubTasks(id) {
    let detailAssignedSubTasks = document.getElementById('detail_subTasks');
    for (let assignedSubTaskIndex = 0; assignedSubTaskIndex < currentTask.subTasks.length; assignedSubTaskIndex++) {
        const currentSubTask = currentTask.subTasks[assignedSubTaskIndex];
        detailAssignedSubTasks.innerHTML += renderAssignedSubTasksTemplate(currentSubTask, assignedSubTaskIndex, id);
        isSubTaskDone(currentSubTask, assignedSubTaskIndex);
    }
}


/**
 * checks if a subtask is done
 * @param {object} currentSubTask is the current subtask, to check if it is done
 * @param {number} assignedSubTaskIndex is the index of the current subtask in the array subtasks in a task
 */
function isSubTaskDone(currentSubTask, assignedSubTaskIndex) {
    let subTaskCheckbox = document.getElementById(`subTask_${assignedSubTaskIndex}`);
    let subTaskTitle = document.getElementById(`subTask_title_${assignedSubTaskIndex}`);
    if (currentSubTask.done) {
        subTaskCheckbox.setAttribute('checked', true);
        subTaskTitle.classList.add('crossed-out');
    } else {
        subTaskCheckbox.removeAttribute('checked');
        subTaskTitle.classList.remove('crossed-out');
    }
}


/**
 * function to mark a subtask as done
 * @param {number} id is the id of a task
 */
async function setSubTaskDone(id) {
    currentTask = filteredTasks.filter((currentTask) => {
        return currentTask.id == id;
    });
    let currentSubTasks = currentTask[0].subTasks;
    subTaskDone(currentSubTasks);
    await backend.setItem('users', JSON.stringify(users));
}


/**
 * sets a subtask done or undone und style it
 * @param {object} currentSubTasks are the current subtasks
 */
function subTaskDone(currentSubTasks) {
    for (let currentSubTaskIndex = 0; currentSubTaskIndex < currentSubTasks.length; currentSubTaskIndex++) {
        const currentSubTask = currentSubTasks[currentSubTaskIndex];
        let subTaskCheckbox = document.getElementById(`subTask_${currentSubTaskIndex}`);
        let subTaskTitel = document.getElementById(`subTask_title_${currentSubTaskIndex}`);
        if (subTaskCheckbox.checked) {
            currentSubTask.done = true;
            subTaskTitel.classList.add('crossed-out');
        }
        if (!subTaskCheckbox.checked) {
            currentSubTask.done = false;
            subTaskTitel.classList.remove('crossed-out');
        }
    }
}


/**
 * renders the subtasks in the edit task mask
 * @param {number} id is the id of the current task 
 */
function editShowSubTasks(id) {
    let detailAssignedSubTasks = document.getElementById('edit_subTasks')
    detailAssignedSubTasks.innerHTML = '';
    for (let assignedSubTaskIndex = 0; assignedSubTaskIndex < currentTask.subTasks.length; assignedSubTaskIndex++) {
        let currentSubTask = currentTask.subTasks[assignedSubTaskIndex];
        detailAssignedSubTasks.innerHTML += editShowSubTasksTemplate(currentSubTask, assignedSubTaskIndex, id);
        isSubTaskDone(currentSubTask, assignedSubTaskIndex);
    }
}


/**
 * identifies the right task to change and add a new subtask
 * @param {number} id ist the id (identification) of the task to change
 */
function newSubTask(id) {
    let newSubTaskText = document.getElementById('new_subtask_text').value;
    let emptySubTaskText = document.getElementById('empty_subtask_text');
    emptySubTaskText.innerHTML = '';
    currentTask = filteredTasks.filter((currentTask) => {
        return currentTask.id == id;
    });
    currentTask = currentTask[0];
    isNewSubTaskEdit(newSubTaskText, emptySubTaskText, id);
}


/**
 * get the new subtask an push it to the right task
 * @param {string} newSubTaskText is the content od the new subtask
 * @param {string} emptySubTaskText is the text to show if the content of the new subtask is empty
 * @param {number} id is the id of the task to add a new subtask
 */
function isNewSubTaskEdit(newSubTaskText, emptySubTaskText, id) {
    if (newSubTaskText.length > 0) {
        let newSubTask = {
            'title': newSubTaskText,
            'done': false
        }
        currentTask.subTasks.push(newSubTask);
        newSubTaskText = '';
        changeTask(id);
    } else {
        emptySubTaskText.innerHTML = 'Please enter a title for the subtask';
    }
}


/**
 * deletes a subtask
 * @param {number} id is the id of the current task
 * @param {number} assignedSubTaskIndex ist the index of the subtasks array from the current tas
 */
async function deleteSubTask(id, assignedSubTaskIndex) {
    currentTask = filteredTasks.filter((currentTask) => {
        return currentTask.id == id;
    });
    currentTask = currentTask[0];
    let currentSubTasks = currentTask.subTasks;
    currentSubTasks.splice(assignedSubTaskIndex, 1);
    editShowSubTasks(id);
    await backend.setItem('users', JSON.stringify(users));
}