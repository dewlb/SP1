const urlBase = 'http://cop4331-team14.xyz/LAMPAPI'; //Future hyperlink
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

/*
//Working on this (Veronica) [General idea of function for now]
function doDeleteContact(){

   // Name = document.getElementById("")
   firstName = document.getElementById("firstName").value;
   lastName = document.getElementById("lastName").value;
   let Phone = document.getElementById("Phone").value;
   let Email = document.getElementById("Email").value;
   Name = firstName + " " + lastName;

   let tmp = { 
    contact: { Name: Name, Phone: Phone, Email: Email},
    userId: userId 
};

let jsonPayload = JSON.stringify(tmp);
let url = urlBase + '/DeleteContact.' + extension;

let xhr = new XMLHttpRequest();
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

xhr.onreadystatechange = function () {
    if (this.readyState == 4) {

        if (this.status == 200) {
            console.log("Contact has been sucessfully deleted.");
        } else {
            document.getElementById("deleteResult").innerHTML = "Error: " + this.status + " " + xhr.statusText;
        }
    }
};

xhr.send(jsonPayload); 

}
*/

// Gracie - working on this
function loadContacts() {
    readCookie(); // Get userId from the cookie

    console.log("Loading contacts for userId:", userId);  // Log userId for debugging

    let tmp = { userId: userId };  // Create payload with userId
    let jsonPayload = JSON.stringify(tmp);  // Convert it to JSON
    let url = urlBase + '/GetContacts.' + extension;  

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            try {
                let jsonObject = JSON.parse(xhr.responseText);
                console.log("Response JSON: ", jsonObject);
                console.log("Contacts loaded: ", jsonObject.contacts);
                populateContactTable(jsonObject.contacts);  // Populate table with contacts
            } catch (e) {
                console.error("Failed to parse response as JSON", e);
            }
        } else {
            console.log("Error: Unable to load contacts, status " + xhr.status);
        }
    }
};
    xhr.send(jsonPayload);
}

function populateContactTable(contacts) {
    let table = document.getElementById('contactTable');

    // Clear existing rows (except for header)
    let rowCount = table.rows.length;
    while (rowCount > 1) {
        table.deleteRow(1);
        rowCount--;
    }

    // Add new rows for each contact
    contacts.forEach(function(contact) {
        let row = table.insertRow();
        
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        cell1.innerHTML = contact.Name || 'N/A';   // Adjusted field name
        cell2.innerHTML = contact.Phone || 'N/A';  // Adjusted field name
        cell3.innerHTML = contact.Email || 'N/A';  // Adjusted field name
        cell4.innerHTML = ''; // Assuming there's no additional field for phone number here
    });
}


// Gracie
function addContact() {

    //readCookie allows program to fetch the userId.
    readCookie();

    // Validation
    if (!validateForm()) {
        return;
    }


    // Retrieving values from the form
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var phone = document.getElementById('Phone').value || "";
    var email = document.getElementById('Email').value || "";

    // AJAX request to add contact to database
    var tmp = {
        contact: { Name: firstName + " " + lastName, Phone: phone, Email: email },
        userId: userId // Assuming userId is defined somewhere in your code
    };

    var jsonPayload = JSON.stringify(tmp);
    var url = urlBase + '/AddContact.' + extension;  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var jsonObject = JSON.parse(xhr.responseText);
                document.getElementById("addResult").innerHTML = "Contact added successfully";

                // Clear form fields after successful addition
                document.getElementById('firstName').value = "";
                document.getElementById('lastName').value = "";
                document.getElementById('Phone').value = "";
                document.getElementById('Email').value = "";

                // Add contact to table only after successful addition to database
                var table = document.getElementById('contactTable');
                var newRow = table.insertRow(-1);
                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);
                var cell3 = newRow.insertCell(2);
                cell1.innerHTML = `${firstName} ${lastName}`;
                cell2.innerHTML = email;
                cell3.innerHTML = phone;

            } else {
                document.getElementById("addResult").innerHTML = "Error: " + xhr.status + " " + xhr.statusText;
            }
        }
    };

    xhr.send(jsonPayload);
}

function doSignUp() {
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Validate password and check if it meets all requirements
    let passwordFeedback = validatePassword(password);
    if (passwordFeedback !== "Password meets all requirements.") {
        document.getElementById("registerResult").innerHTML = passwordFeedback;
        return;
    }

    // Validate other fields
    if (!checkSignUp(firstName, lastName, username, password)) {
        document.getElementById("registerResult").innerHTML = "Please fill out all fields.";
        return;
    }

    document.getElementById("registerResult").innerHTML = "";

    let tmp = { firstName: firstName, lastName: lastName, username: username, password: password };
    let jsonPayload = JSON.stringify(tmp);
    let url = urlBase + '/Signup.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 403) {
                document.getElementById("registerResult").innerHTML = "User already exists.";
                return;
            }

            if (this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.id;
                document.getElementById("registerResult").innerHTML = "User added";
                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;
                //saveCookie(); Commented this out for now (Veronica)
            } else {
                document.getElementById("registerResult").innerHTML = "Error: " + this.status + " " + xhr.statusText;
            }
        }
    };

    xhr.send(jsonPayload);
}

function doLogin() {
    userId = 0;
    firstName = "";
    lastName = "";

    let login = document.getElementById("loginName").value;
    let password = document.getElementById("loginPassword").value;

    console.log("Login Attempt:", login); // Debugging output
    console.log("Password Attempt:", password); // Debugging output

    document.getElementById("loginResult").innerHTML = "";

    let tmp = { login: login, password: password };
    let jsonPayload = JSON.stringify(tmp);
    let url = urlBase + '/Login.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.id;

                console.log("Server Response:", jsonObject); // Debugging output

                if (userId < 1) {
                    document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
                } else {
                    firstName = jsonObject.firstName;
                    lastName = jsonObject.lastName;
                    saveCookie();
                   window.location.href = "manager.html";
                }
            } else {
                document.getElementById("loginResult").innerHTML = "Error: " + this.status + " " + xhr.statusText;
            }
        }
    };

    xhr.send(jsonPayload);
}

//Edited this to store all components separately in the cookie (Veronica)
function saveCookie() {
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));

    document.cookie = "firstName=" + encodeURIComponent(firstName) + ";expires=" + date.toGMTString() + ";path=/";
    document.cookie = "lastName=" + encodeURIComponent(lastName) + ";expires=" + date.toGMTString() + ";path=/";
    document.cookie = "userId=" + userId + ";expires=" + date.toGMTString() + ";path=/";

    //document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();

   // document.cookie = "firstName=" + encodeURIComponent(firstName) + ";lastName=" + encodeURIComponent(lastName) + ";userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie() {
    userId = -1;
    let data = document.cookie;
    let splits = data.split(";");
    for (let i = 0; i < splits.length; i++) {
        let thisOne = splits[i].trim();
        let tokens = thisOne.split("=");
        if (tokens[0] === "firstName") {
            firstName = decodeURIComponent(tokens[1]);
        } else if (tokens[0] === "lastName") {
            lastName = decodeURIComponent(tokens[1]);
        } else if (tokens[0] === "userId") {
            userId = parseInt(tokens[1].trim());
        }
    }

    if (userId < 0) {
        window.location.href = "index.html";
    }
}

function doLogout() {
    userId = 0;
    firstName = "";
    lastName = "";
    document.cookie = "firstName=;lastName=;userId=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html";
}

function checkSignUp(firstName, lastName, username, password) {
    // Validate all fields
    if (firstName === "" || lastName === "" || username === "" || password === "") {
        return "All fields must be filled out.";
    }

    // Check password requirements
    var passwordFeedback = validatePassword(password);
    if (passwordFeedback === "Password meets all requirements.") {
        return true; // All requirements are met
    } else {
        return passwordFeedback; // Return specific feedback
    }
}


// Function to validate the password
function validatePassword(password) {
    const lengthIcon = document.getElementById("length-icon");
    const letterIcon = document.getElementById("letter-icon");
    const numberIcon = document.getElementById("number-icon");
    const specialIcon = document.getElementById("special-icon");

    // Reset icons to X marks
    lengthIcon.textContent = '\u274C'; 
    letterIcon.textContent = '\u274C'; 
    numberIcon.textContent = '\u274C'; 
    specialIcon.textContent = '\u274C'; 

    var feedback = [];

    if (password.length < 8 || password.length > 32) {
        feedback.push("");
    } else {
        lengthIcon.textContent = '\u2714'; 
    }

    if (!/[A-Za-z]/.test(password)) {
        feedback.push("");
    } else {
        letterIcon.textContent = '\u2714'; 
    }

    if (!/\d/.test(password)) {
        feedback.push("");
    } else {
        numberIcon.textContent = '\u2714'; 
    }

    if (!/[@$!%*?&]/.test(password)) {
        feedback.push("");
    } else {
        specialIcon.textContent = '\u2714'; 
    }

    return feedback.length > 0 ? feedback.join(" ") : "Password meets all requirements.";
}


// Function to handle real-time password feedback
function showPasswordFeedback() {
    var password = document.getElementById("loginPassword").value;
    var feedback = validatePassword(password);
    var feedbackElement = document.getElementById("password-feedback");

    // Clear previous feedback
    feedbackElement.innerText = feedback;
}

// Attach the function to the input event
document.getElementById("loginPassword").addEventListener("input", showPasswordFeedback);

function addCheck(firstName, lastName, Phone, Email)
{
    return firstName !== "" && lastName !== "" && Phone !== "" && Email !== "";
}
