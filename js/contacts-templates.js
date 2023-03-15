/**
 * code to show detail view for a contact
 * @param {object} contact is the object of the contact for the detail view
 * @param {string} lettersFB initials of the contact
 * @param {number} index of the contact in the array of contact from the current user
 * @returns html code to show the detail view of the contact
 */
function contactDetailHtml(contact, lettersFB, index) {
    return /*html*/`
        <div id="${index}" class="contact-detail-main-side animationFadeInRight">
            <div class="back">
                <img onclick="closeMediaContact(${index})" src="./assets/img/arrow-back.png" alt="">
            </div>

            <div class="contact-detail-head">
                <div class="contact-detail-big-letter" style="background-color: ${contact['contactcolor']}" >${lettersFB}</div>

                <div class="contact-detail-name-task">
                    <span class="contact-detail-big-name">${contact['contactName']}</span>
                    <span onclick="OpenContactAddTask('0', ${index})" class="contact-detail-add-task"><img src="./assets/img/blue-plus.png" alt="">Add Task</span>
                </div>
            </div>

            <div class="contact-detail-info-main">
                <span class="contact-detail-info">Contact Information</span>
                <span onclick="editContact('${index}', '${lettersFB}')" class="contact-detail-edit" ><img src="./assets/img/icon_edit_contact.png" alt="" class="icon-edit-contact"> Edit Contact</span>
            </div>

            <div class="contact-details-container">
                <div>
                    <h4 class="contact-details">Email</h4>
                    <a href="mailto:${contact['contactEmail']}">${contact['contactEmail']}</a>
                </div>

                <div>
                    <h4 class="contact-details">Mobile</h4>
                    <a href="tel:${contact['contactNumber']}">${contact['contactNumber']}</a>
                </div>
            </div>
        </div>
    `;
}


/**
 * html code to show a contact entry
 * @param {string} i the entire contact 
 * @param {string} lettersFB are the initials of the contact
 * @param {number} index index of contact
 * @returns html code to show the contact Child 
 */
function contactChildHtml(i, lettersFB, index) {
    return /*html*/`
        <div id="${index}"  onclick="openDetailContact('${index}', '${lettersFB}' )" class="contact">
            <div class="contact-initials" style="background-color: ${i['contactcolor']}">
                ${lettersFB}
            </div>
            
            <div class="contact-data">
                <span class="contact-name">${i['contactName']}</span>
                <span class="contact-email">${i['contactEmail']}</span>
            </div>
        </div>
    `;
}


/**
 * html Code to render the contact bar
 * @param {string} letter first letter of name
 * @returns html code to show the contact Bar 
 */
function contactBarHtml(letter) {
    return /*html*/`
    <div class="index-container" >
        <h4  class="index-letter">${letter}</h4>
        <div id="${letter}"></div>
    </div>
    `;
}


/**
 * html code to show the html form to add a new contact
 * @returns html code to show the new contact 
 */
function addNewContactHtml(mo) {
    return /*html*/`
        <div onclick="doNotClose(event)" class="add-contact animationFadeIn">
            <div class="add-contact-head">
                <div class="add-contact-close">
                    <img onclick="closeAddContact(${mo})" src="./assets/img/pngegg.png" alt="" class="img-close" >
                </div>

                <div class="add-contact-header" >           
                    <div class="add-contact-h">
                        Add contact
                    </div>

                    <div class="add-contact-text">
                        Tasks are better with a team!
                    </div>
                </div>
            </div>

            <div class="add-contact-main">
                <div class="contact-member"><img src="./assets/img/contact-member.png" alt=""></div>

                <form onsubmit="createContact(${mo}); return false;" onreset="closeAddContact(${mo})">
                    <div class="input-add-contact-container">
                        <div class="input-contact">
                            <input id="contactName" placeholder="Name" required  type="text"  class="input-contact-name">
                            <img src="./assets/img/signup-user.png" alt="">
                        </div>

                        <div class="input-contact">
                            <input id="contactEmail" placeholder="Email" required type="email"  class="input-contact-name">
                            <img src="./assets/img/login-email.png" alt="">
                        </div>

                        <div  id="emailDone" class="display-none contact-email-done">This Email already exists</div>

                        <div class="input-contact">
                            <input id="contactNumber" placeholder="Phone" required type="text" class="input-contact-name">
                            <img src="./assets/img/phone.png" alt="">
                        </div>
                    </div>

                    <div class="button-container">
                        <button type="reset" class="btn-light">Cancel <img src="./assets/img/cancel.png" alt=""></button>
                        <button type="submit" class="btn">Create contact <img src="./assets/img/rithe.png" alt=""></button>
                    </div>
                </form>
            </div>
        </div>
    `;
}


/**
 * html code to show the form to edit a contact
 * @param {string} contact the entire contact in array
 * @param {string} lettersFB first letter of the name
 * @param {number} index poition in array
 * @returns html code to show the edit contact 
 */
function editContactHtml(contact, lettersFB, index) {
    return /*html*/`
        <div onclick="doNotClose(event)" class="add-contact animationFadeIn">
            <div class="add-contact-head">
                <div onclick="hideAddContacts()" class="add-contact-close">
                    <img src="./assets/img/pngegg.png" alt="" class="img-close">
                </div>

                <div class="add-contact-header">
                    <div class="add-contact-h">Edit contact</div>                   
                </div>
            </div>

            <div class="add-contact-main">
                <div class="contact-detail-big-letter" style="background-color: ${contact['contactcolor']}">
                    <p>${lettersFB}</p>
                </div>
                <form onsubmit="invEditContact('${contact['contactEmail']}', '${index}', '${lettersFB}'); return false">
                    <div>
                        <div class="input-contact">
                            <input id="contactEditName" required  type="text" class="input-contact-name">
                            <img src="./assets/img/signup-user.png" alt="">
                        </div>

                        <div class="input-contact">
                            <input id="contactEditEmail" required type="email" class="input-contact-name">
                            <img src="./assets/img/login-email.png" alt="">
                        </div>

                        <div class="input-contact">
                            <input id="contactEditNumber" required type="text" class="input-contact-name">
                            <img src="./assets/img/phone.png" alt="">
                        </div>
                    </div>

                    <div class="button-container">
                        <button type="button" onclick="deleteContacts(${index})" class="button-cancel">Delete <img src="./assets/img/cancel.png" alt=""></button>
                        <button type="submit">Save <img src="./assets/img/rithe.png" alt="" class="button-create"></button>
                    </div>
                </form>
            </div>
        </div>
    `;
}