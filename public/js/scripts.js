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
    return confirm("Are you sure you want to delete your account? All your posts will also be delete.");
}