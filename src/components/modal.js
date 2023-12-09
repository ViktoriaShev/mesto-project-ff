export function openModal(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", pressEscapeClose);
  popup.addEventListener("click", (evt) => {
    clickOutsideClose(evt, popup);
  });
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", pressEscapeClose);
  popup.removeEventListener("click", clickOutsideClose);
}

function clickOutsideClose(evt, popup) {
  if (!evt.target.closest(".popup__content")) {
    evt.preventDefault();
    closeModal(popup);
  }
}

function pressEscapeClose(evt) {
  if (evt.key === "Escape") {
    evt.preventDefault();
    const selectedPopup = document.querySelector(".popup_is-opened");
    closeModal(selectedPopup);
  }
}
