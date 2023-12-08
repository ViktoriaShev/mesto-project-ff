import { nameNewCardInput, urlInput, popupImage } from "../index.js";

export const cardTemplate = document.querySelector("#card-template").content;
export const placesList = document.querySelector(".places__list");

export function deleteCard(event) {
  const selectedCard = event.target.closest(".card");
  selectedCard.remove();
}

export function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

export function makeCard(cardData, deleteCard, likeCard, openModal) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonRemove = cardElement.querySelector(".card__delete-button");
  const buttonLike = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  buttonRemove.addEventListener("click", deleteCard);
  buttonLike.addEventListener("click", likeCard);
  cardImage.addEventListener("click", (evt) => {
    openModal(evt, popupImage);
  });
  return cardElement;
}

export function addCard(cardData, openModal) {
  const readyCard = makeCard(cardData, deleteCard, likeCard, openModal);
  placesList.append(readyCard);
}

export function handleFormNewCard(evt, openModal, closeModal) {
  evt.preventDefault();
  const newCards = { name: nameNewCardInput.value, link: urlInput.value };
  const readyCard = makeCard(newCards, deleteCard, likeCard, openModal);
  placesList.prepend(readyCard);
  nameNewCardInput.value = "";
  urlInput.value = "";
  closeModal(evt);
}
