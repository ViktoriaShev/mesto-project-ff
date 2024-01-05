import { openModal, closeModal } from "./modal.js";
import {
  deletionRequest,
  requestForLike,
  requestForDeleteLike,
} from "./api.js";

export const cardTemplate = document.querySelector("#card-template").content;

export function deleteCard(event, cardId) {
  const selectedCard = event.target.closest(".card");
  const popupDelete = document.querySelector(".delete__popup");
  const buttonPopupDelete = popupDelete.querySelector(".popup__button");
  openModal(popupDelete);
  buttonPopupDelete.addEventListener("click", (evt) => {
    buttonPopupDelete.textContent = "Удаление...";
    deletionRequest(cardId._id)
      .then((res) => {
        selectedCard.remove();
        closeModal(popupDelete);
        buttonPopupDelete.textContent = "Да";
      })
      .catch((err) => {
        return `Ошибка: ${err.status}`;
      });
  });
}

export function likeCard(event, data, likeCounter) {
  if (!event.target.classList.contains("card__like-button_is-active")) {
    requestForLike(data.informationCard._id).then((res) => {
      likeCounter.textContent = "" + res.likes.length;
    });
  } else {
    requestForDeleteLike(data.informationCard._id)
      .then((res) => {
        likeCounter.textContent = "" + res.likes.length;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      });
  }
  event.target.classList.toggle("card__like-button_is-active");
}

export function makeCard(data, deleteCard, likeCard, handlerOpenPopupImage) {
  const cardData = data.informationCard;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonLike = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeCounter = cardElement.querySelector(".like__counter");
  let contentForCounter = "" + cardData.likes.length;
  likeCounter.textContent = contentForCounter;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  const buttonRemove = cardElement.querySelector(".card__delete-button");
  if (cardData.owner._id === data.informationMe._id) {
    buttonRemove.addEventListener("click", (evt) => {
      deleteCard(evt, cardData);
    });
  } else {
    buttonRemove.remove();
  }
  cardData.likes.forEach((arrayLike) => {
    if (arrayLike._id === data.informationMe._id) {
      buttonLike.classList.add("card__like-button_is-active");
    }
  });
  buttonLike.addEventListener("click", (evt) => {
    likeCard(evt, data, likeCounter);
  });
  cardImage.addEventListener("click", (evt) => {
    handlerOpenPopupImage(evt);
  });
  return cardElement;
}
