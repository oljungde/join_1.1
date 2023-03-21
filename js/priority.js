/**
 * shows the selected priority for the current task in the edit mask
 */
function editShowSelectedPriority() {
    if (currentTask.priority == "urgent") {
        prioritySelect = "urgent";
        showSelectedPriority("urgent", "medium", "low");
    }
    if (currentTask.priority == "medium") {
        prioritySelect = "medium";
        showSelectedPriority("medium", "urgent", "low");
    }
    if (currentTask.priority == "low") {
        prioritySelect = "low";
        showSelectedPriority("low", "urgent", "medium");
    }
}


/**
 * onclick function for the newly edited priority for the current edited task
 * @param {*} i - identifies which priority is clicked
 */
function selectedPriority(i) {
    if (i == 1) {
        prioritySelect = "urgent";
        showSelectedPriority("urgent", "medium", "low");
    }
    if (i == 2) {
        prioritySelect = "medium";
        showSelectedPriority("medium", "urgent", "low");
    }
    if (i == 3) {
        prioritySelect = "low";
        showSelectedPriority("low", "urgent", "medium");
    }
}


/**
 * 
 * @param {string} selectedPriority is the schoosen priority
 * @param {string} priorityDeselect1 is one of the other priorities 
 * @param {string} priorityDeselect2 is the other priority
 */
function showSelectedPriority(selectedPriority, priorityDeselect1, priorityDeselect2) {
    document.getElementById(`priority_${selectedPriority}`).classList.add(`prio-${selectedPriority}-selected`);
    document.getElementById(`priority_${priorityDeselect1}`).classList.remove(`prio-${priorityDeselect1}-selected`);
    document.getElementById(`priority_${priorityDeselect2}`).classList.remove(`prio-${priorityDeselect2}-selected`);

    document.getElementById(`priority_img_${selectedPriority}`).src = `./assets/img/prio-${selectedPriority}-white.png`;
    document.getElementById(`priority_img_${priorityDeselect1}`).src = `./assets/img/prio-${priorityDeselect1}.png`;
    document.getElementById(`priority_img_${priorityDeselect2}`).src = `./assets/img/prio-${priorityDeselect2}.png`;
}