const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass
) => {
  const errorElement = formElement.querySelector(
    `.input_${inputElement.name}-error`
  );
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, inputErrorClass) => {
  const errorElement = formElement.querySelector(
    `.input_${inputElement.name}-error`
  );
  errorElement.textContent = "";
  inputElement.classList.remove(inputErrorClass);
};

export function checkInputValidity(
  formSelector,
  inputSelector,
  inputErrorClass
) {
  if (inputSelector.validity.patternMismatch) {
    inputSelector.setCustomValidity(inputSelector.dataset.errorMessage);
  } else {
    inputSelector.setCustomValidity("");
  }
  if (inputSelector.validity.valid) {
    hideInputError(formSelector, inputSelector, inputErrorClass);
  } else {
    showInputError(
      formSelector,
      inputSelector,
      inputSelector.validationMessage,
      inputErrorClass
    );
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((evt) => {
    return !evt.validity.valid;
  });
};

export function enableValidation(data) {
  toggleButtonState(
    data.inputListFormProfile,
    data.buttonSubmit,
    data.inactiveButtonClass
  );
  data.inputListFormProfile.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      checkInputValidity(data.formSelector, inputElement, data.inputErrorClass);
      toggleButtonState(
        data.inputListFormProfile,
        data.buttonSubmit,
        data.inactiveButtonClass
      );
    });
  });
}

export function clearValidation(
  formElement,
  inputListFormProfile,
  buttonSubmit
) {
  toggleButtonState(inputListFormProfile, buttonSubmit);
  inputListFormProfile.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
    inputElement.removeEventListener("input", (evt) => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputListFormProfile, buttonSubmit);
    });
  });
}

export const toggleButtonState = (
  inputList,
  ButtonPopupSubmit,
  inactiveButtonClass = "popup__button_disabled"
) => {
  if (hasInvalidInput(inputList)) {
    ButtonPopupSubmit.setAttribute("disabled", "");
    ButtonPopupSubmit.classList.add("" + inactiveButtonClass);
  } else {
    ButtonPopupSubmit.classList.remove("" + inactiveButtonClass);
    ButtonPopupSubmit.removeAttribute("disabled", "");
  }
};
