import "../pages/index.css";
import { initialCards } from "./cards";
import { createCard, removeCard, likeCard, zoomCard } from "./card";
import { showPopup, handleFormSubmit } from "./modal";

const placesContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

// загружаем карточки по умолчанию
initialCards.forEach(function (item) {
  const card = createCard(item, removeCard, likeCard, zoomCard);
  placesContainer.append(card);
});

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const addFormElement = document.forms["new-place"];
const addFormNameInput = addFormElement.elements["place-name"];
const addFormLinkInput = addFormElement.elements["link"];

const editFormElement = document.forms["edit-profile"];
const editFormNameInput = editFormElement.elements["name"];
const editFormJobInput = editFormElement.elements["description"];

profileEditButton.addEventListener("click", () => {
  showPopup(".popup_type_edit");
});

profileAddButton.addEventListener("click", () => {
  showPopup(".popup_type_new-card");
});

// слушатель при редактировании
editFormElement.addEventListener("submit", handleFormSubmit);

// слушатель при добавлении новой карточки
addFormElement.addEventListener("submit", (event) => {
  event.preventDefault();

  // формируем свой объект, чтобы пользоваться той же функцией createCard - она принимает объект как аргумент
  const nameInputText = addFormNameInput.value;
  const linkInputText = addFormLinkInput.value;
  const cardData = {};
  cardData.name = nameInputText; // запись свойств объекта
  cardData.link = linkInputText;

  const card = createCard(cardData, removeCard, likeCard, zoomCard); // как и массив карт, добавляем свою карточку к остальным
  placesContainer.prepend(card);

  const openedPopup = event.target.closest(".popup_is-opened"); // закрытие попапа при отправке формы, после сохранения данных
  openedPopup.classList.remove("popup_is-opened");
});

export {
  cardTemplate,
  profileTitle,
  profileDescription,
  editFormNameInput,
  editFormJobInput,
};
