// Обьявление переменных:
const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

//Обьявление функций:
function deleteCard(event) {
  const selectedCard = event.target;
  selectedCard.parentElement.remove();
}

initialCards.forEach(function makeCard(initialCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonRemove = cardElement.querySelector(".card__delete-button");
  cardElement.querySelector(".card__image").src = initialCard.link;
  cardElement.querySelector(".card__title").textContent = initialCard.name;
  placesList.append(cardElement);
  buttonRemove.addEventListener("click", deleteCard);
});
