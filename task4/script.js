const rangeSlider = document.querySelector(".range-slider");
const rangeNumber = document.querySelector(".range-number");
const firstNameAlert = document.querySelector(".first-name-alert");
const emailAlert = document.querySelector(".email-alert");
const passwordAlert = document.querySelector(".password-alert");
const passwordConfirmAlert = document.querySelector(".password-confirm-alert");
const submitButton = document.querySelector(".submit-button");
const submitForm = document.querySelector("#forms");
const firstNameEntryField = document.querySelector("#first-name");
const emailEntryField = document.querySelector("#email");
const passwordEntryField = document.querySelector("#password");
const passwordConfirmEntryField = document.querySelector("#password-confirm");

getFormData = (selector) => Object.fromEntries(new FormData(document.querySelector(selector)))

function showError(inputElement, inputAlert) {
   inputElement.style.borderColor = "red";
   inputAlert.style.display = "block";
   return false;
}

function hideError(inputElement, inputAlert) {
   inputElement.style.borderColor = null;
   inputAlert.style.display = "none";
   return true;
}

class form {
   constructor(firstName, email, password, passwordConfirm) {
      this.firstName = firstName;
      this.email = email;
      this.password = password;
      this.passwordConfirm = passwordConfirm;
   }

   validateFirstName() {
      const isNotShort = this.firstName.length < 3;
      const hasNoSpaces = !(/^\S{3,}$/.test(this.firstName)); //error if has spaces
      const validResult = isNotShort || hasNoSpaces ? showError(firstNameEntryField, firstNameAlert) : hideError(firstNameEntryField, firstNameAlert);
      return validResult;
   }

   validateEmail() {
      const isEmail = this.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      //error if has spaces, don`t have @, don`t have letters before @, after @ must be min 1 letter and min 2 letters after .
      return isEmail ? hideError(emailEntryField, emailAlert) : showError(emailEntryField, emailAlert);
   }

   validatePassword() {
      const isNotShort = this.password.length < 6;
      const hasNoSpaces = !(/^\S{3,}$/.test(this.password)); //error if has spaces
      return isNotShort || hasNoSpaces ? showError(passwordEntryField, passwordAlert) : hideError(passwordEntryField, passwordAlert);
   }

   validatePasswordConfirm() {
      const samePassword = this.password === this.passwordConfirm;
      return samePassword ? hideError(passwordConfirmEntryField, passwordConfirmAlert) : showError(passwordConfirmEntryField, passwordConfirmAlert);
   }
}

let firstNameFieldData = ""
let emailFieldData = ""
let passwordFieldData = ""
let passwordConfirmFieldData = ""

rangeNumber.textContent = rangeSlider.value;

rangeSlider.addEventListener("input", function (event) {
   rangeNumber.textContent = event.target.value;
})

firstNameEntryField.addEventListener("change", () => {
   formDataObject = getFormData('#forms');
   firstNameFieldData = formDataObject["first-name"];
})

emailEntryField.addEventListener("change", () => {
   formDataObject = getFormData('#forms');
   emailFieldData = formDataObject["email"];
})

passwordEntryField.addEventListener("change", () => {
   formDataObject = getFormData('#forms');
   passwordFieldData = formDataObject["password"];
})

passwordConfirmEntryField.addEventListener("change", () => {
   formDataObject = getFormData('#forms');
   passwordConfirmFieldData = formDataObject["password-confirm"];
})

submitForm.addEventListener("submit", (event) => {
   event.preventDefault();
   const userData = new form(firstNameFieldData, emailFieldData, passwordFieldData, passwordConfirmFieldData);
   userData.validateFirstName();
   userData.validateEmail();
   userData.validatePassword();
   userData.validatePasswordConfirm();
})
