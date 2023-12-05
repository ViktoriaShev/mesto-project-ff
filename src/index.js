import "./pages/index.css";
import { initialCards, addCard } from "./components/cards.js";
import {
  modalOpen,
  closePopupWithButton,
  handleFormEditProfile,
  handleFormNewCard,
} from "./components/modal.js";
// Обьявление переменных:
export const placesList = document.querySelector(".places__list");
export const cardTemplate = document.querySelector("#card-template").content;
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
export const formsElement = document.querySelectorAll(".popup__form");
export const nameProfileInput = formsElement[0].querySelector(
  ".popup__input_type_name"
);
export const jobInput = formsElement[0].querySelector(
  ".popup__input_type_description"
);
export const nameNewCardInput = formsElement[1].querySelector(
  ".popup__input_type_card-name"
);
export const urlInput = formsElement[1].querySelector(".popup__input_type_url");
initialCards.forEach(addCard);

buttonEdit.addEventListener("click", modalOpen);
buttonAdd.addEventListener("click", modalOpen);
buttonPopupsClose.forEach(closePopupWithButton);
formsElement[0].addEventListener("submit", handleFormEditProfile);
formsElement[1].addEventListener("submit", handleFormNewCard);
