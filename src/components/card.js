import { openModal, closeModal } from "./modal.js";
import { deleteCard, addLike, removeLike } from "./api.js";
export const cardTemplate = document.querySelector("#card-template").content;

const popupDelete = document.querySelector(".delete__popup");
const buttonPopupDelete = popupDelete.querySelector(".popup__button");

export function launchDeleteCard(event, cardId) {
  const selectedCard = event.target.closest(".card");
  openModal(popupDelete);
  buttonPopupDelete.addEventListener("click", (evt) => {
    buttonPopupDelete.textContent = "Удаление...";
    deleteCard(cardId._id)
      .then((res) => {
        selectedCard.remove();
        closeModal(popupDelete);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally((res) => {
        buttonPopupDelete.textContent = "Да";
      });
  });
}

export function likeCard(event, data, likeCounter) {
  if (!event.target.classList.contains("card__like-button_is-active")) {
    addLike(data.informationCard._id)
      .then((res) => {
        likeCounter.textContent = "" + res.likes.length;
        event.target.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    removeLike(data.informationCard._id)
      .then((res) => {
        likeCounter.textContent = "" + res.likes.length;
        event.target.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function makeCard(
  data,
  launchDeleteCard,
  likeCard,
  handlerOpenPopupImage
) {
  const cardData = data.informationCard;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonLike = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeCounter = cardElement.querySelector(".like__counter");
  const contentForCounter = "" + cardData.likes.length;
  likeCounter.textContent = contentForCounter;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  const buttonRemove = cardElement.querySelector(".card__delete-button");
  if (cardData.owner._id === data.informationMe._id) {
    buttonRemove.addEventListener("click", (evt) => {
      launchDeleteCard(evt, cardData);
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
