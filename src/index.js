import "./pages/index.css";
import { makeCard, likeCard, launchDeleteCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserInfo,
  getCards,
  updateUserServerInfo,
  createNewPost,
  changeAvatar,
} from "./components/api.js";
// Обьявление переменных:
const validationLink = /http.*(jpeg|jpg|gif|png)/gi;

const placesList = document.querySelector(".places__list");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const profileImage = document.querySelector(".profile__image");
//const profileImage = document.querySelector(".profile_edit_blackout");
//Модальные окна:
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupNewAvatar = document.querySelector(".popup_type_edit_avatar");
const buttonPopupsClose = document.querySelectorAll(".popup__close");
const selectedPopupImage = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");

//Элементы формы:
const formElementEditProfile = popupEdit.querySelector(
  ".popup__form[name='edit-profile']"
);
const formElementNewPlace = popupNewCard.querySelector(
  ".popup__form[name='new-place']"
);
const formElementEditAvatar = popupNewAvatar.querySelector(
  ".popup__form[name='edit-avatar']"
);

const formList = Array.from(document.querySelectorAll(".popup__form"));

const inputListFormProfile = Array.from(
  formElementEditProfile.querySelectorAll(".popup__input")
);

const inputListFormAddCard = Array.from(
  formElementNewPlace.querySelectorAll(".popup__input")
);

const inputListFormEditAvatar = Array.from(
  formElementEditAvatar.querySelectorAll(".popup__input")
);

const nameProfileInput = formElementEditProfile.querySelector(
  ".popup__input_type_name"
);
const jobInput = formElementEditProfile.querySelector(
  ".popup__input_type_description"
);

const nameNewCardInput = formElementNewPlace.querySelector(
  ".popup__input_type_card-name"
);
const urlInput = formElementNewPlace.querySelector(".popup__input_type_url");

const buttonPopupEditPtofileSubmit =
  formElementEditProfile.querySelector(".popup__button");

const buttonPopupAddCardSubmit =
  formElementNewPlace.querySelector(".popup__button");

const buttonPopupNewAvatarSubmit =
  formElementEditAvatar.querySelector(".popup__button");

const dataForCards = [getUserInfo, getCards];

function addCard(data) {
  return makeCard(data, launchDeleteCard, likeCard, handlerOpenPopupImage);
}

function updateUserInfo(data) {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImage.setAttribute("style", `background-image: url(${data.avatar})`);
}

function renderInitialCards(data) {
  data.forEach((dataCard) => {
    if (!validationLink.test(dataCard.link)) {
    } else {
      const readyCard = addCard({
        informationCard: dataCard,
        informationMe: dataUserInfo,
      });
      placesList.append(readyCard);
    }
  });
}

function loadInitialInfo() {
  Promise.all(dataForCards)
    .then((data) => {
      window.dataUserInfo = data[0];
      updateUserInfo(dataUserInfo);
      renderInitialCards(data[1]);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function renderNewCard(dataNewCard) {
  const dataCard = dataNewCard;
  const readyCard = addCard({
    informationCard: dataCard,
    informationMe: dataUserInfo,
  });
  placesList.prepend(readyCard);
}

function handlerOpenPopupImage(evt) {
  selectedPopupImage.src = evt.target.src;
  selectedPopupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openModal(popupImage);
}

function handlerFormEditProfile(evt, formElement) {
  evt.preventDefault();
  buttonPopupEditPtofileSubmit.textContent = "Сохранение...";
  updateUserServerInfo({ name: nameProfileInput.value, job: jobInput.value })
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally((res) => {
      buttonPopupEditPtofileSubmit.textContent = "Сохранить";
    });
}

function handlerFormNewCard(evt, closeModal, formElement) {
  buttonPopupAddCardSubmit.textContent = "Сохранение...";
  evt.preventDefault();
  const newCards = {
    name: nameNewCardInput.value,
    link: urlInput.value,
    likes: [],
  };
  createNewPost({ dataCard: newCards })
    .then((res) => {
      renderNewCard(res);
      closeModal(popupNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally((evt) => {
      buttonPopupAddCardSubmit.textContent = "Создать";
    });
}

function handlerEditAvatar(evt, formElementEditAvatar) {
  evt.preventDefault();
  buttonPopupNewAvatarSubmit.textContent = "Сохранение...";
  const linkImg = formElementEditAvatar.querySelector(".popup__input_type_url");
  changeAvatar(linkImg.value)
    .then((link) => {
      profileImage.setAttribute(
        "style",
        `background-image: url(${link.avatar})`
      );
      linkImg.value = "";
      closeModal(popupNewAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally((res) => {
      buttonPopupNewAvatarSubmit.textContent = "Сохранить";
    });
}

//Открытие попапов:

buttonEdit.addEventListener("click", (evt) => {
  nameProfileInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
  clearValidation(
    formElementEditProfile,
    inputListFormProfile,
    buttonPopupEditPtofileSubmit,
    "popup__button_disabled"
  );
});

buttonAdd.addEventListener("click", (evt) => {
  formElementNewPlace.reset();
  clearValidation(
    formElementNewPlace,
    inputListFormAddCard,
    buttonPopupAddCardSubmit
  );
  openModal(popupNewCard);
});

profileImage.addEventListener("click", (evt) => {
  clearValidation(
    formElementEditAvatar,
    inputListFormEditAvatar,
    buttonPopupNewAvatarSubmit
  );
  openModal(popupNewAvatar);
});

//Закрытие попапов:

buttonPopupsClose.forEach((evt) => {
  evt.addEventListener("click", (evt) => {
    closeModal(evt.target.closest(".popup"));
  });
});

//Отправка данных:

formElementEditProfile.addEventListener("submit", (evt) => {
  handlerFormEditProfile(evt, formElementEditProfile);
});

formElementNewPlace.addEventListener("submit", (evt) => {
  handlerFormNewCard(evt, closeModal, formElementNewPlace);
});

formElementEditAvatar.addEventListener("submit", (evt) => {
  handlerEditAvatar(evt, formElementEditAvatar);
});
//Валидация:

formList.forEach((formElement) => {
  enableValidation({
    formSelector: formElement,
    inputListFormProfile: Array.from(
      formElement.querySelectorAll(".popup__input")
    ),
    buttonSubmit: formElement.querySelector(".popup__button"),
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  });
});

//Добавление карточек и работа с сервером:

loadInitialInfo();
