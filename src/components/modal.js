import {
  profileTitle,
  profileDescription,
  nameProfileInput,
  jobInput,
} from "../index.js";

export function openModal(evt, ParentPopup) {
  ParentPopup.classList.add("popup_is-animated");
  ParentPopup.classList.add("popup_is-opened");
  if (ParentPopup.classList.contains("popup_type_edit")) {
    nameProfileInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  } else if (ParentPopup.classList.contains("popup_type_image")) {
    const selectedPopupImage = ParentPopup.querySelector(".popup__image");
    const popupCaption = ParentPopup.querySelector(".popup__caption");
    selectedPopupImage.src = evt.target.src;
    selectedPopupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
  }
  document.addEventListener("keydown", pressEscapeClose);
  ParentPopup.addEventListener("click", clickOutsideClose);
}

export function closeModal(event) {
  let selectedPopup = event.target.closest(".popup");
  if (event.key === "Escape") {
    selectedPopup = document.querySelector(".popup_is-opened");
  }
  selectedPopup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", pressEscapeClose);
  selectedPopup.removeEventListener("click", clickOutsideClose);
}

function clickOutsideClose(evt) {
  if (!evt.target.closest(".popup__content")) {
    evt.preventDefault();
    closeModal(evt);
  }
}

function pressEscapeClose(evt) {
  if (evt.key === "Escape") {
    evt.preventDefault();
    closeModal(evt);
  }
}
