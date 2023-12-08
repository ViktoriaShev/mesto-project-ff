import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { addCard, handleFormNewCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
// Обьявление переменных:
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const buttonEdit = document.querySelector(".profile__edit-button");
export const buttonAdd = document.querySelector(".profile__add-button");
//Модальные окна:
export const popupEdit = document.querySelector(".popup_type_edit");
export const popupNewCard = document.querySelector(".popup_type_new-card");
export const popupImage = document.querySelector(".popup_type_image");
export const buttonPopupsClose = document.querySelectorAll(".popup__close");
//Элементы формы:
export const formsElementEditProfile = popupEdit.querySelector(
  ".popup__form[name='edit-profile']"
);
export const formsElementNewPlace = popupNewCard.querySelector(
  ".popup__form[name='new-place']"
);
export const nameProfileInput = formsElementEditProfile.querySelector(
  ".popup__input_type_name"
);
export const jobInput = formsElementEditProfile.querySelector(
  ".popup__input_type_description"
);
export const nameNewCardInput = formsElementNewPlace.querySelector(
  ".popup__input_type_card-name"
);
export const urlInput = formsElementNewPlace.querySelector(
  ".popup__input_type_url"
);

function handleFormEditProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameProfileInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(evt);
}

initialCards.forEach((evt) => {
  addCard(evt, openModal);
});

buttonEdit.addEventListener("click", (evt) => {
  openModal(evt, popupEdit);
});

buttonAdd.addEventListener("click", (evt) => {
  openModal(evt, popupNewCard);
});

buttonPopupsClose.forEach((evt) => {
  evt.addEventListener("click", closeModal);
});

formsElementEditProfile.addEventListener("submit", handleFormEditProfile);
formsElementNewPlace.addEventListener("submit", (evt) => {
  handleFormNewCard(evt, openModal, closeModal);
});
