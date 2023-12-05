import { makeCard, deleteCard, likeCard } from "./cards.js";
import {
  placesList,
  popupEdit,
  popupNewCard,
  profileTitle,
  profileDescription,
  nameProfileInput,
  jobInput,
  nameNewCardInput,
  urlInput,
  popupImage,
} from "../index.js";

export function modalOpen(evt) {
  const openingPopupElement = document.querySelector(
    "." + evt.target.classList
  );
  let selectedPopup = ""; // переменная хранит данные о модальном окне, которое открыто
  if (openingPopupElement.classList.contains("profile__edit-button")) {
    popupEdit.classList.add("popup_is-animated");
    popupEdit.classList.add("popup_is-opened");
    selectedPopup = popupEdit;
    nameProfileInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  } else if (openingPopupElement.classList.contains("profile__add-button")) {
    popupNewCard.classList.add("popup_is-animated");
    popupNewCard.classList.add("popup_is-opened");
    selectedPopup = popupNewCard;
  } else if (openingPopupElement.classList.contains("card__image")) {
    selectedPopup = popupImage;
    openPopupPicture(selectedPopup, evt);
  }
  selectedPopup.addEventListener("keydown", keyEscapeClose);
  selectedPopup.addEventListener("click", keyEscapeClose);
}

export function closePopupWithButton(evt) {
  evt.addEventListener("click", modalClose);
}

export function handleFormEditProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameProfileInput.value;
  profileDescription.textContent = jobInput.value;
  modalClose(evt);
}

export function handleFormNewCard(evt) {
  evt.preventDefault();
  const newCards = { name: nameNewCardInput.value, link: urlInput.value };
  const readyCard = makeCard(newCards, deleteCard, likeCard, modalOpen);
  placesList.prepend(readyCard);
  nameNewCardInput.value = "";
  urlInput.value = "";
  modalClose(evt);
}

function modalClose(event) {
  let selectedPopup = event.target.closest(".popup");
  selectedPopup.classList.remove("popup_is-opened");
  selectedPopup.removeEventListener("keydown", keyEscapeClose);
}

function keyEscapeClose(evt) {
  if (evt.key === "Escape" || !evt.target.closest(".popup__content")) {
    evt.preventDefault();
    modalClose(evt);
  }
}

function openPopupPicture(selectedPopup, evt) {
  const selectedPopupImage = selectedPopup.querySelector(".popup__image");
  const popupCaption = selectedPopup.querySelector(".popup__caption");
  selectedPopupImage.src = evt.target.src;
  selectedPopupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  popupImage.classList.add("popup_is-opened");
  popupImage.classList.add("popup_is-animated");
}
