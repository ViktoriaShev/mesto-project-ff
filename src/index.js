import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { makeCard, likeCard, deleteCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
// Обьявление переменных:
const placesList = document.querySelector(".places__list");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
//Модальные окна:
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const buttonPopupsClose = document.querySelectorAll(".popup__close");
const selectedPopupImage = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");
//Элементы формы:
const formsElementEditProfile = popupEdit.querySelector(
  ".popup__form[name='edit-profile']"
);
const formsElementNewPlace = popupNewCard.querySelector(
  ".popup__form[name='new-place']"
);
const nameProfileInput = formsElementEditProfile.querySelector(
  ".popup__input_type_name"
);
const jobInput = formsElementEditProfile.querySelector(
  ".popup__input_type_description"
);
const nameNewCardInput = formsElementNewPlace.querySelector(
  ".popup__input_type_card-name"
);
const urlInput = formsElementNewPlace.querySelector(".popup__input_type_url");

function handlerOpenPopupImage(evt) {
  selectedPopupImage.src = evt.target.src;
  selectedPopupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openModal(popupImage);
}

function addCard(cardData) {
  const readyCard = makeCard(
    cardData,
    deleteCard,
    likeCard,
    handlerOpenPopupImage
  );
  placesList.append(readyCard);
}

function handlerFormEditProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameProfileInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
}

function handlerFormNewCard(evt, closeModal) {
  evt.preventDefault();
  const newCards = { name: nameNewCardInput.value, link: urlInput.value };
  const readyCard = makeCard(
    newCards,
    deleteCard,
    likeCard,
    handlerOpenPopupImage
  );
  placesList.prepend(readyCard);
  nameNewCardInput.value = "";
  urlInput.value = "";
  closeModal(popupNewCard);
}

initialCards.forEach((evt) => {
  addCard(evt);
});

buttonEdit.addEventListener("click", (evt) => {
  nameProfileInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
});

buttonAdd.addEventListener("click", (evt) => {
  openModal(popupNewCard);
});

buttonPopupsClose.forEach((evt) => {
  evt.addEventListener("click", (evt) => {
    closeModal(evt.target.closest(".popup"));
  });
});

formsElementEditProfile.addEventListener("submit", handlerFormEditProfile);

formsElementNewPlace.addEventListener("submit", (evt) => {
  handlerFormNewCard(evt, closeModal);
});
