// Validation code for inputs
const userName = document.getElementById('username');
const password = document.getElementById('password');
const errorElem = document.getElementById('error');

userName.addEventListener('textInput', username_verify);
password.addEventListener('textInput', password_verify);

// function to validate input fields
function validated() {
    if (userName.value.length === 0 && password.value.length === 0) {
        userName.style.border = '1px solid red';
        password.style.border = '1px solid red';
        errorElem.style.display = 'block';
        return false;
    } else if (userName.value.length === 0) {
        userName.style.border = '1px solid red';
        errorElem.style.display = 'block';
        userName.focus();
        return false;
    }else if (password.value.length === 0) {
        password.style.border = '1px solid red';
        errorElem.style.display = 'block';
        password.focus();
        return false;
    } else {
        login();
    }
}

function username_verify() {
    if (userName.value.length > 0) {
        userName.style.border = '1px solid silver';
        errorElem.style.display = 'none';
        return true;
    }
}

function password_verify() {
    if (password.value.length > 0) {
        password.style.border = '1px solid silver';
        errorElem.style.display = 'none';
        return true;
    }
}

function login() {
    if (localStorage.getItem('LoginUsers')) {
        const userDetails = JSON.parse(localStorage.getItem('LoginUsers'));
        const currentUser = userDetails.find((user) => { 
            if (userName.value === user.username) {
                return user;
            }
        });
        if ((userName.value.length && password.value.length) !== 0 && currentUser === undefined) {
            userName.style.border = '1px solid red';
            password.style.border = '1px solid red';
            errorElem.style.display = 'block';
            return false;
        }  
        if (currentUser.password === password.value) {
            alert('You are successfully logged in');

            // Navigate to resume viewer
            window.location.href = "./resume-page.html";
        } 
        if (password.value.length !== 0) {
            console.log('Invalid Username/Password.');
            password.style.border = '1px solid red';
            errorElem.style.display = 'block';
            return false;
        }
    } else 
        alert('User details is not stored');
}

// This function will restrict the user from going back to the login page (Once the user is in the Resume page)
window.history.forward();
function noBack() {
  window.history.forward();
}

