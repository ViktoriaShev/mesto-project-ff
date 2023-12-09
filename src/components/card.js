export const cardTemplate = document.querySelector("#card-template").content;

export function deleteCard(event) {
  const selectedCard = event.target.closest(".card");
  selectedCard.remove();
}

export function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

export function makeCard(
  cardData,
  deleteCard,
  likeCard,
  handlerOpenPopupImage
) {
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
    handlerOpenPopupImage(evt);
  });
  return cardElement;
}
