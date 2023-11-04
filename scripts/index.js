// Обьявление переменных:
const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

//Обьявление функций:
function deleteCard(event) {
  const selectedCard = event.target.closest(".card");
  selectedCard.remove();
}

function makeCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonRemove = cardElement.querySelector(".card__delete-button");
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".card__image").alt =
    "Изображение показывает" + cardData.name;
  buttonRemove.addEventListener("click", deleteCard);
  return cardElement;
}

function addCard(notReady_card) {
  const readyCard = makeCard(notReady_card,deleteCard);
  placesList.append(readyCard);
}

//Добавление на страницу начальные карточки:
initialCards.forEach(addCard);
