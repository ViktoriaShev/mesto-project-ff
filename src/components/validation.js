const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(
    `.input_${inputElement.name}-error`
  );
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(
    `.input_${inputElement.name}-error`
  );
  errorElement.textContent = "";
  inputElement.classList.remove("popup__input_type_error");
};

export function checkInputValidity(formSelector, inputSelector) {
  if (inputSelector.validity.patternMismatch) {
    inputSelector.setCustomValidity(inputSelector.dataset.errorMessage);
  } else {
    inputSelector.setCustomValidity("");
  }
  if (inputSelector.validity.valid) {
    hideInputError(formSelector, inputSelector);
  } else {
    showInputError(
      formSelector,
      inputSelector,
      inputSelector.validationMessage
    );
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((evt) => {
    return !evt.validity.valid;
  });
};

export function enableValidation(data) {
  const inputListFormProfile = Array.from(
    data.formSelector.querySelectorAll(".popup__input")
  );
  const ButtonPopupSubmit = data.formSelector.querySelector(".popup__button");
  toggleButtonState(
    inputListFormProfile,
    ButtonPopupSubmit,
    data.inactiveButtonClass
  );
  inputListFormProfile.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      checkInputValidity(data.formSelector, inputElement);
      toggleButtonState(
        inputListFormProfile,
        ButtonPopupSubmit,
        data.inactiveButtonClass
      );
    });
  });
}

export function clearValidation(
  formElement,
  inputListFormProfile,
  ButtonPopupSubmit
) {
  toggleButtonState(inputListFormProfile, ButtonPopupSubmit);
  inputListFormProfile.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
    inputElement.removeEventListener("input", (evt) => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputListFormProfile, ButtonPopupSubmit);
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
