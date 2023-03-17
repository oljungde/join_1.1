/**
 * shows the selected priority for the current task in the edit mask
 */
function editShowSelectedPriority() {
    if (currentTask.priority == "urgent") {
        prioritySelect = "urgent";
        showSelectedPriorityUrgent();
    }
    if (currentTask.priority == "medium") {
        prioritySelect = "medium";
        showSelectedPriorityMedium();
    }
    if (currentTask.priority == "low") {
        prioritySelect = "low";
        showSelectedPriorityLow()
    }
}


/**
 * onclick function for the newly edited priority for the current edited task
 * @param {*} i - identifies which priority is clicked
 */
function selectedPriority(i) {
    if (i == 1) {
        prioritySelect = "urgent";
        showSelectedPriorityUrgent();
    }
    if (i == 2) {
        prioritySelect = "medium";
        showSelectedPriorityMedium();
    }
    if (i == 3) {
        prioritySelect = "low";
        showSelectedPriorityLow();
    }
}


/**
 * shows the urgent category button
 */
function showSelectedPriorityUrgent() {
    document.getElementById("priorityUrgent").classList.add('prio-urgent-selected');
    document.getElementById("priorityMedium").classList.remove('prio-medium-selected');
    document.getElementById("priorityLow").classList.remove('prio-low-selected');

    document.getElementById('priorityUrgentImg').src = './assets/img/prio-urgent-white.png';
    document.getElementById('priorityMediumImg').src = './assets/img/prio-medium.png';
    document.getElementById('priorityLowImg').src = './assets/img/prio-low.png';
}


/**
 * shows the medium category button
 */
function showSelectedPriorityMedium() {
    document.getElementById("priorityMedium").classList.add('prio-medium-selected');
    document.getElementById("priorityUrgent").classList.remove('prio-urgent-selected');
    document.getElementById("priorityLow").classList.remove('prio-low-selected');

    document.getElementById('priorityUrgentImg').src = './assets/img/prio-urgent.png';
    document.getElementById('priorityMediumImg').src = './assets/img/prio-medium-white.png';
    document.getElementById('priorityLowImg').src = './assets/img/prio-low.png';
}


/**
 * shows the low category button
 */
function showSelectedPriorityLow() {
    document.getElementById("priorityLow").classList.add('prio-low-selected');
    document.getElementById("priorityUrgent").classList.remove('prio-urgent-selected');
    document.getElementById("priorityMedium").classList.remove('prio-medium-selected');

    document.getElementById('priorityUrgentImg').src = 'assets/img/prio-urgent.png';
    document.getElementById('priorityMediumImg').src = 'assets/img/prio-medium.png';
    document.getElementById('priorityLowImg').src = 'assets/img/prio-low-white.png';
}