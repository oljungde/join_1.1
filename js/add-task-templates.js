function openAddTaskHtml(i, taskStatus) {
  return /*html*/`
    <form onsubmit="addToTask(${i}, '${taskStatus}'); return false;" class="add-task-form">
      <img onclick="closeAddTaskMask(${i})" src="assets/img/close.png" alt="close" class="close-cross">
      <div class="add-task-headline">
        <h2>Add Task</h2>
        <button class="btn">Create Task <img src="assets/img/white-check.png" alt="create task"></button>
      </div>

      <div class="input-container">
        <input id="AddTitle" type="text" placeholder="Enter a title" autocomplete="off" required class="add-task-title">
      </div>

      <div id="user_selector">
        <div onclick="showUsers(${i})" class="selector-header">
          Select contacts to assign
          <img  src="assets/img/blue-dropdown-arrow.png" alt="select contact">
        </div>
      </div>

      <div id="selector_user_dropdown"></div>
      <div id="selector_user_dropdown_contact" class="display-flex-in-addtask"></div>

      <h4>Due Date</h4>
      <div class="input-container">
          <input id="add-date" class="add-task-due-date" placeholder="dd/mm/yy" type="date" required>
      </div>

      <h4>Category</h4>  
      <div id="chooseCategory" class="alert display-none">This field is required</div>      
      <div id="category_selector">
        <div id="selected_category" class="selector-header" onclick="showTaskCategories()">
          Select task category
          <img  src="assets/img/blue-dropdown-arrow.png" alt="">
        </div>
      </div>
      <div id="selector_Category_Dropdown"></div>

      <span id="chossePriority" class="alert display-none">This field is required</span>
      <div class="priorityContainer">
        <div class="priority-urgent" onclick="selectedPriority(1)" id="priorityUrgent">
          <p>Urgent</p> 
          <img id="priorityUrgentImg" src="assets/img/prio-urgent.png" alt="">
        </div>

        <div class="priority-medium" id="priorityMedium" onclick="selectedPriority(2)">
          <p>Medium</p> 
          <img id="priorityMediumImg" src="assets/img/prio-medium.png" alt="">
        </div>

        <div class="priority-low" id="priorityLow" onclick="selectedPriority(3)">
          <p>Low</p> 
          <img id="priorityLowImg" src="assets/img/prio-low.png" alt="">
        </div>
      </div>

      <h4>Description</h4>
      <div>
        <textarea class="add-description" id="AddDescription" type="text" placeholder="Enter a Description"></textarea>
      </div>

      <h4>Subtasks</h4>
      <div id="empty_subtask_text"></div>

      <div id="newSubtask_select" class="input-container">
        <input class="input" id="new_subtask_text" type="text" placeholder="Add new subtask">
        <div class="checkAndCrossIconsCategory">
          <img src="./assets/img/blue-cross.png" onclick="clearSubTasks()" class="blue-cross pointer">
          <img src="./assets/img/devider.png">
          <img src="./assets/img/blue-check.png" onclick="pushSubtasks()" class="blue-check pointer">
        </div>
      </div>

    <div id="addSubtaskCheckbox"></div>
  </form>
`;
}


/**
 * @returns the html for the invite new Contact Link
 */
function showInviteNewContact() {
  return /*html*/ `
    <div class="selectorCell" onclick="openAddContact(1)">
      <div>Invite new contact</div>
      <div><img src="./assets/img/newContact-img.png"></div>
    </div>
  `;
}


/**
 * @param {*} i 
 * @param {*} activUserContact 
 * @param {*} currentUser 
 * @returns the html for the contacts dropdown menu in the add task html
 */
function showContactsDropDown(i, activUserContact, currentUser) {
  return /*html*/`
  <div onclick="selectedUser('${currentUser.contacts[i]['contactInitials']}', '${currentUser.contacts[i]['contactcolor']}', '${currentUser.contacts[i]['contactName']}')" class="selectorCell">
      <div>${activUserContact[i].contactName}</div>
      <div><img id="user_select${currentUser.contacts[i]['contactInitials']}${currentUser.contacts[i]['contactcolor']}${currentUser.contacts[i]['contactName']}" src="./assets/img/userSelect-img.png"></div>
  </div>
  `;
}


function showSelectCategory(category, color) {
  return /*html*/`
    <div class="selector-header pointer" onclick="showTaskCategories()" id="selected_category">
      <div class="selected">
        ${category}
        <img src="./assets/img/${color}.png" />
      </div>
      <img  src="assets/img/blue-dropdown-arrow.png" alt="">
    </div>
  `;
}


function showNewCategory() {
  return /*html*/`
    <div onclick="changeInputCategory()" class="selectorCell">
       <div>New category</div>
         <div class="selectorCellColor"><img src=""></div>
       </div>
    </div>
  `;
}


function showExistingCategories(staticCategorys) {
  return /*html*/`  
    <div onclick="selectedCategory('${staticCategorys['taskCategory']}','${staticCategorys['taskColor']}')" class="selectorCell">
      <div>${staticCategorys['taskCategory']}
      </div>

      <div>
        <img src="./assets/img/${staticCategorys['taskColor']}.png" </div>
    </div>
  `;
}


function showChangeInputCategory() {
  return /*html*/`
    <div>
      <div id="alert_message" class="alert"></div>
        <div class="inputfield-new-category">
          <input class="input" id="input-new-category" type="text" placeholder="New category name" required>
          <div class="checkAndCrossIconsCategory">
              <img src="./assets/img/blue-cross.png" onclick="exitCategoryInput()" class="blue-cross pointer">
              <img src="./assets/img/devider.png">
              <img src="./assets/img/blue-check.png" onclick="addCategory()" id="input-new-category" class="blue-check pointer">
          </div>
        </div>
    
      <div id="categoryColorCells"style="margin-top: 10px; margin-left: 20px; ">
        <img onclick="addCategoryColor('lightblueCategory')" class="categoryColor pointer" style="margin-right: 20px;" src="./assets/img/lightblueCategory.png">
        <img onclick="addCategoryColor('redCategory')" class="categoryColor pointer" style="margin-right: 20px;" src="./assets/img/redCategory.png">
        <img onclick="addCategoryColor('greenCategory')" class="categoryColor pointer" style="margin-right: 20px;" src="./assets/img/greenCategory.png">
        <img onclick="addCategoryColor('orangeCategory')" class="categoryColor pointer" style="margin-right: 20px;" src="./assets/img/orangeCategory.png">
        <img onclick="addCategoryColor('purpleCategory')" class="categoryColor pointer" style="margin-right: 20px;" src="./assets/img/purpleCategory.png">
        <img onclick="addCategoryColor('blueCategory')" class="categoryColor pointer" src="./assets/img/blue-category.png">
      </div>
    </div>`;
}


function showExitCategoryInput() {
  return /*html*/`
    <div id="selected_category" class="selector-header pointer" onclick="showTaskCategories()">
      Select task category   <img  src="assets/img/blue-dropdown-arrow.png">
    </div>

    <div id="selector_Category_Dropdown"></div>
  `;
}

/**
 * 
 * @param {*} subTask 
 * @param {*} subTaskIndex 
 * @returns the html for the rendered subtasks in the addtask Mask
 */
function showSubtaskCheckbox(subTask, subTaskIndex) {
  return /*html*/ `
  <div id="subTask_${subTaskIndex}" class="subtasks">
    <span>${subTask.title}</span> 
    <img src="./assets/img/trash-blue.png" onclick="deleteSubTaskAdd(${subTaskIndex})" class="subtasks-trash" alt="trash"> 
  </div>
`;
}