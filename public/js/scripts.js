// Footer year
function displayYear() {
    const date = new Date();
    const year = date.getFullYear();
    document.getElementById('year').innerText = year;
}

// Admin Flag Button color switcher
function changeFlagBtnColor() {
    const flag = document.getElementsByClassName('flag');
    for (const element of flag) {
        if (element.innerHTML == 'false') {
            element.style.backgroundColor = '#ff372999';
        }
    }
}

// Edit & Submit button switcher on click
function editSubmitSwitcher() {
    // Get the edit and submit buttons 
    const submit = document.getElementById('uSubmit');
    const edit = document.getElementById('uEdit');
    const editForm = document.getElementById('editForm');
    // Submit buttons is disabled
    submit.style.display = 'none';
    editForm.style.display = 'none';
    edit.addEventListener("click", () => {
        edit.style.display = 'none';
        submit.style.display = 'inline';
        editForm.style.display = 'inline';
        window.scrollTo(0, document.body.scrollHeight);
    });
    submit.addEventListener("click", () => {
        submit.style.display = 'none';
        edit.style.display = 'inline';
        editForm.style.display = 'none';
    });
}

// JavaScript function to submit the form
function submitForm() {
    document.getElementById("userEditForm").submit();
}

// Delete Confirmation
function confirmDelete() {
    // Show a confirmation dialog
    return confirm("Are you sure you want to delete it permanently? Once deleted all your data will be gone.");
}
//  otp button script

function otpBtn() {
    const btn = document.getElementById('otpBtnId');
    const otpMsg = document.getElementById('otpMsg');
    const email = document.getElementById('username');
     if (isValidEmail(email.value)) {
        otpMsg.style.display = 'block';
        btn.disabled = true;
        fetch('/auth/genOtp');
        otpMsg.innerHTML = "A four digit otp has been send to your email address, check the spam folder.";
        setTimeout(() => {
            btn.disabled = false;
        }, 3000);
        
    } else {
        otpMsg.style.display = "block";
        otpMsg.innerHTML = "Enter Correct Email First!";
    }
}

//check password and confirm password are same or not
function validatePassword() {
    const password = document.getElementById('password');
    const confirm = document.getElementById('confirm');
    const error = document.getElementById('error');
    if (password.value != confirm.value) {
        error.style.color = 'red';
        error.innerHTML = '⚠️ Passwords should be equal.';
        error.style.display = 'block';
        return false;
    }
    return true;
}

function isValidEmail(email) {
    return /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email);
}
