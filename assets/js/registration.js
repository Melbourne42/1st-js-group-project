let error = false;
const errorMismatch = [];
function checkInputs() {
    const userInput = document.getElementById("name_input");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const emailInput = document.getElementById("email_input");
    const password = document.getElementById("password");
    const passwordInput = document.getElementById("password_input");
    const repeatInput = document.getElementById("repeat_password_input");
    const repeatPassword = document.getElementById("repeatPassword");
    const userError = document.getElementById('errorId');
    const emailError = document.getElementById('errorMail');
    const passwordError = document.getElementById('errorPassword');
    const repeatPasswordError = document.getElementById('errorRepeatPassword');
    const errorSamePassword = document.getElementById('samePassword');
    checkUsername(userInput, username, userError);
    checkEmail(email, emailInput, emailError);
    checkPassword(password, passwordInput, passwordError);
    checkRepeat(repeatInput, repeatPassword, repeatPasswordError);
    checkSamePassword(password, repeatPassword, repeatInput, errorSamePassword);
    if (!error && !errorMismatch.length) {
        const userData = { username: username.value, email: email.value }
        localStorage.setItem('userdata', JSON.stringify(userData))
        window.location.href = 'index.html';
    }
}
function createError(id, message) {
    const errorElement = document.createElement('div');
    const errorText = document.createTextNode(message);
    errorElement.id = id;
    errorElement.appendChild(errorText)
    return errorElement;
}
function showError(errorId, errorMessage, errorInput) {
    const errorElement = createError(errorId, errorMessage)
    errorInput.appendChild(errorElement)
}
function checkUsername(userInput, username, userError) {
    if (userError) {
        userInput.removeChild(userError);
    }
    const errorId = 'errorId'
    error = checkValidity(username, errorId, userInput)
}
function checkEmail(email, emailInput, emailError) {
    if (emailError) {
        emailInput.removeChild(emailError);
    }
    const errorId = 'errorMail'
    error = checkValidity(email, errorId, emailInput)
}
function checkPassword(password, passwordInput, passwordError) {
    if (passwordError) {
        passwordInput.removeChild(passwordError);
    }
    const errorId = 'errorPassword'
    error = checkValidity(password, errorId, passwordInput)
}
function checkRepeat(repeatInput, repeatPassword, repeatPasswordError) {
    if (repeatPasswordError) {
        repeatInput.removeChild(repeatPasswordError);
    }
    const errorId = 'errorRepeatPassword'
    error = checkValidity(repeatPassword, errorId, repeatInput);
}
function checkSamePassword(password, repeatPassword, repeatInput, errorSamePassword) {
    if (!password.value || !repeatPassword.value) {
        return
    }
    if (errorSamePassword) {
        repeatInput.removeChild(errorSamePassword);
    }
    if (password.value !== repeatPassword.value) {
        const errorId = 'samePassword'
        const errorMessage = 'Пароли не совпадают!';
        showError(errorId, errorMessage, repeatInput)
        error = true;
    }
    else {
        error = false
    }
}
function checkValidity(input, errorId, errorInput) {
    let validity = input.validity
    if (validity.valueMissing) {
        const errorMessage = 'Поле не заполнено';
        showError(errorId, errorMessage, errorInput)
        return true
    }
    if (validity.patternMismatch) {
        const errorMessage = 'Неверный формат заполнения';
        showError(errorId, errorMessage, errorInput)
        errorMismatch.push(errorId)
        return true
    }
    if (validity.tooShort) {
        const errorMessage = 'Минимальное значение не может быть меньше чем 8';
        showError(errorId, errorMessage, errorInput)
        errorMismatch = false
        return true
    }
    const currentError = errorMismatch.indexOf(errorId)
    currentError !== -1 && errorMismatch.splice(currentError, 1)
    return false
}
document
    .getElementById("button")
    .addEventListener("click", () => checkInputs());