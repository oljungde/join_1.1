let today = new Date().toISOString().split('T')[0];
let selectorCategoryIndex = 0;
let taskCategorySelector = [];
let categorySelectedColor;
let selectorContactIndex = 0;
let userSelect = [];
let taskCategoryFinaly = [];
let prioritySelect = [];
let subTasks = [];
let userSelected = [];

/**
 * init function will execute wenn page add-task.html is loading
 * checks if user is logged in 
 * execute "global" init function from script.js
 */
async function initAddTask() {
  await init();
  setNavLinkActive();
  checkUserIsLoggedIn();
  getTasksOfCurrentUser();
  imgheader();
  getToday();
}


function getToday() {
  document.getElementById('add-date').setAttribute('min', today);
}


/**
 * defines the current task and pushes it to the Array alltasks and saves it in the backend
 * @param {*} i - identifies from where the task is created
 */
async function addToTask(i, taskStatus) {
  if (taskCategoryFinaly.length == 0) {
    document.getElementById('chooseCategory').classList.remove('display-none');
  }
  else if (prioritySelect.length == 0) {
    document.getElementById('chossePriority').classList.remove('display-none');
  }
  else {
    await addTask(taskStatus);
    resetAddTask();
    if (i == 0) {
      window.location.href = './board.html';
      filterTasksByStatus();
    }
    else if (i == 1) {
      document.getElementById('add-task-overlay').classList.add('display-none');
      document.getElementById('add-task-container').innerHTML = '';
      showTaskAddedPopUp();
      filterTasksByStatus();
    }
  }
  selectorContactIndex = 0;
}


async function addTask(taskStatus) {
  let title = document.getElementById('AddTitle');
  let description = document.getElementById('AddDescription');
  let dueDate = document.getElementById('add-date');
  let currentTask = {
    "id": (new Date().getTime() * Math.random()).toFixed(0),
    "category": {
      Category: taskCategoryFinaly,
      TaskColor: taskCategoryColorFinaly,
    },
    "title": title.value,
    "description": description.value.replace(/\n/g, "<br>\n"),
    "dueDate": dueDate.value,
    "priority": prioritySelect,
    "user": userSelect,
    "subTasks": subTasks,
    'status': taskStatus
  };
  currentUserTasks.push(currentTask);
  await backend.setItem('users', JSON.stringify(users));
}


function resetAddTask() {
  prioritySelect = [];
  taskCategoryFinaly = [];
  subTasks = [];
  userSelect = [];
}


/**
 * generates the pop up ater a task is created
 */
function showTaskAddedPopUp() {
  document.getElementById('task_added_to_board_img').classList.remove('display-none');
  setTimeout(() => {
    document.getElementById('task_added_to_board_img').classList.add('display-none');
  }, 1000);
}


/**
 * renders the AddTask Mask
 * @param {*} i - idintifies from where the task is created
 */
function openAddTaskMask(i, taskStatus) {
  document.getElementById('detail_content').classList.add('display-none');
  document.getElementById('add-task-overlay').classList.remove('display-none');
  document.getElementById('add-task-container').classList.remove('display-none');
  userSelect = [];
  selectedSubtasks = [];
  let openAddTask = document.getElementById('add-task-container');
  openAddTask.innerHTML = openAddTaskHtml(i, taskStatus);
  getToday();
}


/**
 * renders the subTask in the add task mask
 */
function renderSubTask() {
  document.getElementById("addSubtaskCheckbox").innerHTML = ``;
  for (let subTaskIndex = 0; subTaskIndex < subTasks.length; subTaskIndex++) {
    subTask = subTasks[subTaskIndex];
    document.getElementById("addSubtaskCheckbox").innerHTML += showSubtaskCheckbox(subTask, subTaskIndex);
  }
}


/**
 * deletes the subtask
 * @param {number} subTaskIndex is the index of the subtask in the array subtasks
 */
function deleteSubTaskAdd(subTaskIndex) {
  document.getElementById(`subTask_${subTaskIndex}`).innerHTML = ``;
  subTasks.splice(subTaskIndex, 1);
}


/**
 * pushing new subTask in to the task array
 */
function pushSubtasks() {
  let newSubTaskText = document.getElementById('new_subtask_text').value;
  let emptySubTaskText = document.getElementById('empty_subtask_text');
  emptySubTaskText.innerHTML = '';
  isNewSubTask(newSubTaskText, emptySubTaskText);
}


/**
 * get the content from the new subtask an push it to the array of the task
 * @param {string} newSubTaskText is the content of the new subtask
 * @param {string } emptySubTaskText is the text to show if the con from the new subtask is empty
 */
function isNewSubTask(newSubTaskText, emptySubTaskText) {
  let subTaskInput = document.getElementById("new_subtask_text")
  if (newSubTaskText.length > 0) {
    newSubTask = {
      'title': newSubTaskText,
      'done': false
    }
    subTasks.push(newSubTask)
    renderSubTask(newSubTask);
    document.getElementById('new_subtask_text').value = ``
  } else if (newSubTaskText.length == 0) {
    subTaskInput.placeholder = 'Please enter a subtask!';
    setTimeout(() => {
      subTaskInput.placeholder = 'Add a new subtask!';
    }, 2000);
  }
}


/**
 * clear subtask input
 */
function clearSubTasks() {
  if (document.getElementById('new_subtask_text').value != null) {
    document.getElementById("new_subtask_text").value = '';
  }
}


/**
 * closes the AddTaskMask
 * @param {number} i 
 */
function closeAddTaskMask(i) {
  userSelect = [];
  if (i == 1) {
    document.getElementById('add-task-overlay').classList.add('display-none');
    selectorContactIndex = 0;
  }
  else if (i == 0) {
    document.getElementById('openContactAddtaskBG').classList.add('display-none');
    selectorContactIndex = 0;
    contactsAddTask();
  }
}


/**
 * renders the Drop Down Menu for the User selection
 * @param {*} contact 
 */
function showUsers(contact) {
  let activUserContact = currentUser.contacts;
  document.getElementById('selector_user_dropdown').innerHTML = ``;
  if (selectorContactIndex == 0) {
    document.getElementById('selector_user_dropdown_contact').innerHTML = ``;
    selectorContactIndex++;
    for (let i = 0; i < activUserContact.length; i++) {
      document.getElementById('selector_user_dropdown').innerHTML += showContactsDropDown(i, activUserContact, currentUser);
    }
    if (!(contact == 0)) {
      document.getElementById('selector_user_dropdown').innerHTML += showInviteNewContact();
    }
    if (contact == 0) {
      addContactSelection();
    }
    if (userSelect.length > 0) {
      renderSelectedUserContacts();
    }
  }
  else {
    showSelectedContactBubbles();
  }
}


function addContactSelection() {
  let f = saveContactForAddTask;
  let contactInTask = currentUser.contacts[f];
  let contactInitials = contactInTask['contactInitials'];
  let contactColor = contactInTask['contactColor'];
  let contactName = contactInTask['contactName'];
  selectedUser(contactInitials, contactColor, contactName);
}


function renderSelectedUserContacts() {
  for (let o = 0; o < userSelect.length; o++) {
    let contactInitials = userSelect[o]['contactInitials'];
    let contactColor = userSelect[o]['concolor'];
    let contactName = userSelect[o]['contactName'];
    selectedUserAdd(contactInitials, contactColor, contactName);
  }
}


/**
 * shows the contact bubbles for the selected contacts after closing the drop down menu
 */
function showSelectedContactBubbles() {
  document.getElementById('selector_user_dropdown').innerHTML = ``;
  for (let i = 0; i < userSelect.length; i++) {
    document.getElementById('selector_user_dropdown_contact').innerHTML += `
        <div style="background-color:${userSelect[i]['concolor']}" class="user edit-contact-list">${userSelect[i]['contactInitials']}</div>
      `;
  }
  selectorContactIndex--;
}


function contactsAddTask() {
  let f = saveContactForAddTask;
  let contactInTask = currentUser.contacts[f];
  let contactColor = contactInTask['contactColor'];
  let index = findeContactIndex(contactColor);
  userSelect.splice(index, 1);
  document.getElementById('selector_user_dropdown').innerHTML = ``;
}


function selectedUserAdd(contactInitials, contactColor, contactName) {
  document.getElementById('user_select' + contactInitials + contactColor + contactName).classList.add('checked');
  document.getElementById('user_select' + contactInitials + contactColor + contactName).src = 'assets/img/userSelect-selected.png';
}


// getting selected User
function selectedUser(contactInitials, contactColor, contactName) {
  let index = findeContactIndex(contactColor);
  let look = index - 1;
  if (document.getElementById('user_select' + contactInitials + contactColor + contactName).classList.contains('checked')) {
    unselectContact(index, contactInitials, contactColor, contactName);
  }
  else if (look < 0) {

  }
  else {
    selectContact(contactInitials, contactColor, contactName)
  }
}


function unselectContact(index, contactInitials, contactColor, contactName) {
  userSelect.splice(index, 1)
  document.getElementById('user_select' + contactInitials + contactColor + contactName).classList.remove('checked');
  document.getElementById('user_select' + contactInitials + contactColor + contactName).src = 'assets/img/userSelect-img.png';
}


function selectContact(contactInitials, contactColor, contactName) {
  userSelect.push({
    'contactInitials': contactInitials,
    'concolor': contactColor,
    'contactName': contactName
  });
  document.getElementById('user_select' + contactInitials + contactColor + contactName).classList.add('checked');
  document.getElementById('user_select' + contactInitials + contactColor + contactName).src = 'assets/img/userSelect-selected.png';
}


function findeContactIndex(contactColor) {
  let index;
  for (let i = 0; i < userSelect.length; i++) {
    if (userSelect[i].concolor == contactColor)
      index = i;
  }
  return index;
}


/**
 * renders the Drop Down Menu for the categories
 */
function showTaskCategories() {
  if (selectorCategoryIndex == 0) {
    document.getElementById('selector_Category_Dropdown').innerHTML = ``;
    document.getElementById('selector_Category_Dropdown').innerHTML += showNewCategory();
    for (let n = 0; n < currentUser.category.length; n++) {
      let staticCategorys = currentUser.category[n];
      document.getElementById('selector_Category_Dropdown').innerHTML += showExistingCategories(staticCategorys);
    }
    selectorCategoryIndex++;
  } else {
    document.getElementById('selector_Category_Dropdown').innerHTML = ``;
    selectorCategoryIndex--;
  }
};


/**
 * getting selected Category
 * @param {*} category - the newly generated category
 * @param {*} color - the chosen color
 */
function selectedCategory(category, color) {
  taskCategoryFinaly = category;
  taskCategoryColorFinaly = color;
  document.getElementById('category_selector').innerHTML = showSelectCategory(category, color);
  document.getElementById('selector_Category_Dropdown').innerHTML = '';
  selectorCategoryIndex--;
}


/**
 * renders the Input field for categorys
 */
function changeInputCategory() {
  document.getElementById('selector_Category_Dropdown').innerHTML = '';
  document.getElementById('category_selector').innerHTML = showChangeInputCategory();
}


/**
 * renders the drop down field when exiting the category generator
 */
function exitCategoryInput() {
  document.getElementById('category_selector').innerHTML = showExitCategoryInput();
  showTaskCategories();
}


/**
 * adds a chosen color to the newly generated category
 * @param {*} value - defines the clicked color
 */
function addCategoryColor(value) {
  if (document.getElementById("input-new-category").value) {
    categorySelectedColor = value;
    document.getElementById('categoryColorCells').innerHTML = ``;
    document.getElementById('categoryColorCells').innerHTML = /*html*/` <img class="chosen-color" src="./assets/img/${categorySelectedColor}.png" alt="">`;
    document.getElementById('alert_message').innerHTML = '';
  } else {
    document.getElementById('alert_message').innerHTML = `Please enter category first!`;
  }
}


/**
 * adds a individual category to the task
 */
async function addCategory() {
  newCategory = document.getElementById('input-new-category').value;
  if (categorySelectedColor && newCategory) {
    currentUser.category.push({
      'taskCategory': newCategory,
      'taskColor': categorySelectedColor
    });
    document.getElementById('alert_message').innerHTML = '';
    document.getElementById('chooseCategory').classList.add('display-none');
    await backend.setItem('users', JSON.stringify(users));
    exitCategoryInput();
    showTaskCategories();
  } else {
    document.getElementById('alert_message').innerHTML = `Please select a category name and then a color!`;
  }
};