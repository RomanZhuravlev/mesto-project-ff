import "../pages/index.css";
import { initialCards } from "./cards";
import { createCard, removeCard, likeCard, zoomCard } from "./card";
import { showPopup, closePopup } from "./modal";

const placesContainer = document.querySelector(".places__list");

// загружаем карточки по умолчанию
initialCards.forEach(function (item) {
  const card = createCard(item, removeCard, likeCard, zoomCard);
  placesContainer.append(card);
});

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profilePopup = document.querySelector(".popup_type_edit");
const popupInputName = profilePopup.querySelector(".popup__input_type_name");
const popupInputDescription = profilePopup.querySelector(
  ".popup__input_type_description"
);
const cardAddPopup = document.querySelector(".popup_type_new-card");

const addFormElement = document.forms["new-place"];
const addFormNameInput = addFormElement.elements["place-name"];
const addFormLinkInput = addFormElement.elements["link"];

const editFormElement = document.forms["edit-profile"];
const editFormNameInput = editFormElement.elements["name"];
const editFormJobInput = editFormElement.elements["description"];

const popups = document.querySelectorAll(".popup");

// объединение обработчиков оверлея и крестиков
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closePopup(popup); // проверка, нажали на оверлей или нет, и закрытие попапа
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup); // проверка, нажали на крестик или нет, и закрытие попапа
    }
  });
});

profileEditButton.addEventListener("click", () => {
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileDescription.textContent;

  showPopup(profilePopup);
});

profileAddButton.addEventListener("click", () => {
  showPopup(cardAddPopup);
});

// слушатель при редактировании
editFormElement.addEventListener("submit", handleProfileFormSubmit);

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

  event.target.reset(); // очистка формы после добавления карточки

  cardAddPopup.classList.remove("popup_is-opened"); // закрытие попапа при отправке формы, после сохранения данных
});

// Обработчик «отправки» формы
function handleProfileFormSubmit(event) {
  event.preventDefault();

  const nameInputText = editFormNameInput.value; // взятие значений из каждого input
  const jobInputText = editFormJobInput.value;

  profileTitle.textContent = nameInputText; // подстановка текста в инфо профиля
  profileDescription.textContent = jobInputText;

  profilePopup.classList.remove("popup_is-opened");
}
