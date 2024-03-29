let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * init function will execute wenn page summary.html is loading
 * checks if user is logged in 
 * execute "global" init function from script.js
 */
async function initSummary() {
    checkUserIsLoggedIn();
    await init();
    setNavLinkActive();
    showCurrentUserName();
    greetingUser();
    showNumberOfTasksUrgent();
    showNextDueDate();
    showNumberOfTasksByStatus('toDo');
    showNumberOfTasks();
    showNumberOfTasksByStatus('inProgress');
    showNumberOfTasksByStatus('awaitingFeedback');
    showNumberOfTasksByStatus('done');
    imgheader();
}


/**
 * shows the name of logged in user after the greeting
 */
function showCurrentUserName() {
    let currentUserNameBox = document.getElementById('current_user_name');
    currentUserNameBox.innerHTML = currentUser.name;
}


/**
 * shows the greeting by time of day 
 */
function greetingUser() {
    let userGreetingBox = document.getElementById('user_greeting');
    let hour = new Date().getHours();
    let welcomeTimes = ['Good morning,', 'Good afternoon,', 'Good evening,'];
    let welcomeMessage;
    if (hour < 12) {
        welcomeMessage = welcomeTimes[0];
    } else if (hour < 18) {
        welcomeMessage = welcomeTimes[1];
    } else {
        welcomeMessage = welcomeTimes[2];
    }
    userGreetingBox.innerHTML = welcomeMessage;
}


/**
 * shows the date when the next task is due that does not have the status done
 */
function showNextDueDate() {
    let tasksNotDone = currentUser.tasks.filter((tasksStatus) => {
        return tasksStatus.status != 'done';
    });
    let dueDates = tasksNotDone.map((dueDates) => {
        return dueDates.dueDate;
    });
    dueDates = dueDates.sort();
    checkNextDueDate(dueDates);
}


/**
 * checks the next due date
 * @param {array} dueDates is the assorted array of all due dates
 */
function checkNextDueDate(dueDates) {
    let upcomingDeadline = document.getElementById('upcoming_deadline');
    if (dueDates.length > 0 && dueDates[0] != '') {
        let dueDate = new Date(dueDates[0]);
        let month = months[dueDate.getMonth()];
        let nextDueDate = month + ' ' + dueDate.getDate() + ', ' + dueDate.getFullYear();
        upcomingDeadline.innerHTML = nextDueDate;
    } else {
        upcomingDeadline.innerHTML = `No upcoming deadline`;
    }
}


/**
 * shows the number of all tasks incl. tasks are done
 */
function showNumberOfTasks() {
    let numberOfTasksContainer = document.getElementById('number_of_tasks');
    let numberOfTasks = currentUser.tasks.length;
    numberOfTasksContainer.innerHTML = numberOfTasks;
}


/**
 * shows the number of tasks with the priority urgent on summary.html
 */
function showNumberOfTasksUrgent() {
    let numberOfTasksUrgentContainer = document.getElementById('number_of_tasks_urgent');
    let numberOfTasksUrgent = 0;
    for (let i = 0; i < currentUser.tasks.length; i++) {
        let taskStatus = currentUser.tasks[i].priority;
        if (taskStatus == 'urgent') {
            numberOfTasksUrgent = numberOfTasksUrgent + 1;
        }
    }
    numberOfTasksUrgentContainer.innerHTML = numberOfTasksUrgent;
}


/**
 * determines the number of tasks by status
 * @param {*} status of the task
 */
function showNumberOfTasksByStatus(status) {
    let numberOfTasksContainer = document.getElementById(`number_of_tasks_${status}`);
    let numberOfTasksByStatus = 0;
    for (let i = 0; i < currentUser.tasks.length; i++) {
        let taskStatus = currentUser.tasks[i].status;
        if (taskStatus == status) {
            numberOfTasksByStatus = numberOfTasksByStatus + 1;
        }
    }
    numberOfTasksContainer.innerHTML = numberOfTasksByStatus;
}