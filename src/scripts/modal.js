function showPopup(popupToOpen) {
  popupToOpen.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

// закрытие попапа Esc'ом
function handleEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

export { showPopup, closePopup, handleEscape };
