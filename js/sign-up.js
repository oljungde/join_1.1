async function initSignUp() {
    await init();
    checkUserIsLoggedIn();
    passwordInputIconChange();
}


/**
 * get user data from html5 form and check if user is registered
 */
function addUser() {
    let nameAssign = document.getElementById('name_assign');
    let emailAssign = document.getElementById('email_assign');
    nameAssign.classList.add('display-none');
    emailAssign.classList.add('display-none');
    let userName = document.getElementById('user_name').value;
    let userEmail = document.getElementById('user_email').value;
    let userPassword = document.getElementById('user_password').value;
    checkIsUserRegistered(userName, userEmail, userPassword);
}


/**
 * checks the array users contains name and email adress in lower case 
 * @param {string} userName is the name of the user who wants to register
 * @param {string} userEmail ist the email adress of the user who wants to register
 * @param {string} userPassword password of the user who wants to register
 */
function checkIsUserRegistered(userName, userEmail, userPassword) {
    let indexOfName = users.findIndex(user => user.nameMatchCode == userName.toLowerCase());
    let indexOfEmail = users.findIndex(user => user.emailMatchCode == userEmail.toLowerCase());
    checkRegistrationData(indexOfName, indexOfEmail);
}


/**
 * Shows the user a error message if the choosen name oder email adress is registered
 * @param {number} indexOfName is the index of the users name in the array users, if the array don't contains this name the value is -1
 * @param {string} indexOfEmail is the index of the users email adress in the array users, if the array don't contains this email adress the value is -1
 */
function checkRegistrationData(indexOfName, indexOfEmail) {
    let userName = document.getElementById('user_name').value;
    let userEmail = document.getElementById('user_email').value;
    let userPassword = document.getElementById('user_password').value;
    if (indexOfName == -1 && indexOfEmail == -1) {
        userRegister(userName, userEmail, userPassword);
    }
    userNameIsRegistered(indexOfName);
    userEmailIsRegistered(indexOfEmail);
}


function userNameIsRegistered(indexOfName) {
    let nameAssign = document.getElementById('name_assign');
    if (indexOfName != -1) {
        nameAssign.classList.remove('display-none');
    }
}


function userEmailIsRegistered(indexOfEmail) {
    let emailAssign = document.getElementById('email_assign');
    if (indexOfEmail != -1) {
        emailAssign.classList.remove('display-none');
    }
}


/**
 * register the user and added the user data in the array users and save this array in the backend
 * @param {string} userName is the choosen user name to register
 * @param {string} userEmail is the choosen email adress to register
 * @param {string} userPassword ist the choosen password string to register
 */
function userRegister(userName, userEmail, userPassword) {
    pushNewUser(userName, userEmail, userPassword);
    createDummyContact(userEmail);
    createDummyTask(userEmail);
    backend.setItem('users', JSON.stringify(users));
    sessionStorage.setItem('loggedIn', 'false');
    localStorage.setItem('rememberMe', 'false');
    registrationComplete();
}


/**
 * push the opject with user data to the array users
 * @param {string} userName is the name of the user to push
 * @param {string} userEmail is the email adress from the user to push
 * @param {string} userPassword ist the password from the user to push
 */
function pushNewUser(userName, userEmail, userPassword) {
    users.push({
        'name': userName,
        'nameMatchCode': userName.toLowerCase(),
        'email': userEmail,
        'emailMatchCode': userEmail.toLowerCase(),
        'password': userPassword,
        'tasks': [],
        'contacts': [],
        'letterTask': [],
        'category':
            [{ taskCategory: 'Sales', taskColor: 'purpleCategory' },
            { taskCategory: 'Backoffice', taskColor: 'blueCategory' }]
    });
}


/**
 * creates a dummy contact for the new user
 * @param {string} userEmail adress of the user who register
  */
function createDummyContact(userEmail) {
    const newUser = users.find(user => user.email == userEmail);
    console.log(newUser);
    newUser.contacts.push({
        contactColor: '#80102f',
        contactEmail: 'dummy-contact@no-adress.com',
        contactInitials: 'DC',
        contactLetter: 'D',
        contactName: 'Dummy Contact',
        contactNumber: '123456789'
    });
    newUser.letterTask.push('D');
}


/**
 * creates a dummy task for the new user
 * @param {string} userEmail adress of the user who register
 */
function createDummyTask(userEmail) {
    const newUser = users.find(user => user.email == userEmail);
    newUser.tasks.push({
        category: {
            Category: 'Sales',
            TaskColor: 'purpleCategory',
        },
        description: 'This is your first task. You can edit or delete it.',
        dueDate: '2023-12-31',
        id: (new Date().getTime() * Math.random()).toFixed(0),
        priority: 'urgent',
        status: 'toDo',
        subTasks: [
            {
                title: 'Subtask 1',
                done: true
            },
            {
                title: 'Subtask 2',
                done: false
            }],
        title: ' Your first task',
        user: [
            {
                concolor: '#80102f',
                contactInitials: 'DC',
                contactName: 'Dummy Contact',
            }
        ]
    });
}


/**
 * reders a success message, when user completed registration
 */
function registrationComplete() {
    let signupContent = document.getElementById('sign_up');
    signupContent.innerHTML = registrationCompleteTemplate();
}