import { placesList, cardTemplate } from "../index.js";
import { modalOpen } from "./modal.js";

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//Обьявление функций:
export function deleteCard(event) {
  const selectedCard = event.target.closest(".card");
  selectedCard.remove();
}

export function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

export function makeCard(cardData, deleteCard, likeCard, modalOpen) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonRemove = cardElement.querySelector(".card__delete-button");
  const buttonLike = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".card__image").alt = cardData.name;
  buttonRemove.addEventListener("click", deleteCard);
  buttonLike.addEventListener("click", likeCard);
  cardImage.addEventListener("click", modalOpen);
  return cardElement;
}

export function addCard(cardData) {
  const readyCard = makeCard(cardData, deleteCard, likeCard, modalOpen);
  placesList.append(readyCard);
}
