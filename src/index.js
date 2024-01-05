import "./pages/index.css";
import { makeCard, likeCard, deleteCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  initialization,
  downloadCards,
  updatedUserData,
  createNewPost,
  requestChacgeAvatar,
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

function addCard(data) {
  return makeCard(data, deleteCard, likeCard, handlerOpenPopupImage);
}
function loadingAccount(data) {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImage.setAttribute("style", `background-image: url(${data.avatar})`);
}
function PreparingCards(data) {
  data[1].forEach((dataCard) => {
    if (!validationLink.test(dataCard.link)) {
    } else {
      const readyCard = addCard({
        informationCard: dataCard,
        informationMe: data[0],
      });
      placesList.append(readyCard);
    }
  });
}
function PreparingCardsAndAccount() {
  const dataForCards = [initialization, downloadCards];
  Promise.all(dataForCards)
    .then((data) => {
      loadingAccount(data[0]);
      PreparingCards(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function PreparingNewCard(dataNewCard) {
  const dataForCards = [initialization, downloadCards];
  Promise.all(dataForCards)
    .then((data) => {
      const dataCard = dataNewCard;
      const readyCard = addCard({
        informationCard: dataCard,
        informationMe: data[0],
      });
      placesList.prepend(readyCard);
    })
    .catch((err) => {
      console.log(err);
    });
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
  updatedUserData({ name: nameProfileInput.value, job: jobInput.value })
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .catch((err) => {
      return `Ошибка: ${err.status}`;
    })
    .finally((res) => {
      closeModal(popupEdit);
      buttonPopupEditPtofileSubmit.textContent = "Сохранить";
    });
  clearValidation(
    formElementEditProfile,
    inputListFormProfile,
    buttonPopupEditPtofileSubmit
  );
  clearValidation(
    formElement,
    inputListFormProfile,
    buttonPopupEditPtofileSubmit
  );
}

function handlerFormNewCard(evt, closeModal, formElement) {
  buttonPopupAddCardSubmit.textContent = "Сохранение...";
  evt.preventDefault();
  const newCards = {
    name: nameNewCardInput.value,
    link: urlInput.value,
    likes: [],
  };
  const myData = initialization;
  createNewPost({ dataCard: newCards, myData })
    .then((res) => {
      PreparingNewCard(res);
      closeModal(popupNewCard);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`);
    })
    .finally((evt) => {
      buttonPopupAddCardSubmit.textContent = "Создать";
      clearValidation(
        formElement,
        inputListFormAddCard,
        buttonPopupAddCardSubmit
      );
      nameNewCardInput.value = "";
      urlInput.value = "";
    });
}

function handlerEditAvatar(evt, formElementEditAvatar) {
  evt.preventDefault();
  buttonPopupNewAvatarSubmit.textContent = "Сохранение...";
  const linkImg = formElementEditAvatar.querySelector(".popup__input_type_url");
  requestChacgeAvatar(linkImg.value)
    .then((link) => {
      profileImage.setAttribute(
        "style",
        `background-image: url(${link.avatar})`
      );
      linkImg.value = "";
    })
    .catch((err) => {
      return `Ошибка: ${err.status}`;
    })
    .finally((res) => {
      clearValidation(
        formElementEditAvatar,
        inputListFormEditAvatar,
        buttonPopupNewAvatarSubmit
      );
      buttonPopupNewAvatarSubmit.textContent = "Сохранить";
      closeModal(popupNewAvatar);
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
  clearValidation(
    formElementNewPlace,
    inputListFormAddCard,
    buttonPopupAddCardSubmit
  );
  openModal(popupNewCard);
});

profileImage.addEventListener("click", (evt) => {
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

function additionFormEventListeners() {
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    enableValidation({
      formSelector: formElement,
      inactiveButtonClass: "popup__button_disabled",
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__error_visible",
    });
  });
}
//Добавление карточек и работа с сервером:

PreparingCardsAndAccount();

additionFormEventListeners();
