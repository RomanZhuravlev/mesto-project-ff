import "../pages/index.css";
import { createCard } from "./card";
import { showPopup, closePopup } from "./modal";
import { enableValidation, clearValidation } from "./validation";
import {
  getUserInfo,
  getCards,
  editProfile,
  addCard,
  deleteCard,
  editAvatar,
} from "./api";

// отдельные файлы для констант и утилит я сделаю позже, тк это не критически важно на данном этапе

const placesContainer = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const headerLogo = document.querySelector(".profile__image");

const profilePopup = document.querySelector(".popup_type_edit");
const popupInputName = profilePopup.querySelector(".popup__input_type_name");
const popupInputDescription = profilePopup.querySelector(
  ".popup__input_type_description"
);

const cardAddPopup = document.querySelector(".popup_type_new-card");

const editAvatarPopup = document.querySelector(".popup_type_edit-avatar");

const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const editFormElement = document.forms["edit-profile"];
const editFormNameInput = editFormElement.elements["name"];
const editFormJobInput = editFormElement.elements["description"];

const addFormElement = document.forms["new-place"];
const addFormNameInput = addFormElement.elements["place-name"];
const addFormLinkInput = addFormElement.elements["link"];

const editAvatarFormElement = document.forms["edit-avatar"];
const editAvatarFormUrlInput = editAvatarFormElement.elements["link"];

const popups = document.querySelectorAll(".popup");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
let myId; // сюда вытащим значение из getUserInfo() для дальнейшего переиспользования

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

function zoomCard(cardImage, cardDescription) {
  popupImage.src = cardImage;
  popupImage.alt = cardDescription;
  popupCaption.textContent = cardDescription;

  showPopup(imagePopup);
}

profileEditButton.addEventListener("click", () => {
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileDescription.textContent;
  clearValidation(editFormElement, validationConfig);
  showPopup(profilePopup);
});

profileAddButton.addEventListener("click", () => {
  addFormNameInput.value = "";
  addFormLinkInput.value = "";
  clearValidation(addFormElement, validationConfig);
  showPopup(cardAddPopup);
});

headerLogo.addEventListener("click", () => {
  editAvatarFormUrlInput.value = "";
  clearValidation(editAvatarFormElement, validationConfig);
  showPopup(editAvatarPopup);
});

// слушатель при редактировании
editFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
  event.submitter.textContent = "Сохранить...";

  editProfile(editFormNameInput.value, editFormJobInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopup(profilePopup);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      event.submitter.textContent = "Сохранить";
    });
});

// слушатель при добавлении новой карточки
addFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
  event.submitter.textContent = "Сохранить...";

  addCard(addFormNameInput.value, addFormLinkInput.value)
    .then((res) => {
      const cardData = {
        name: res.name,
        link: res.link,
        likes: res.likes,
        cardId: res._id,
        ownerId: res.owner._id,
      };
      placesContainer.prepend(createCard(cardData, myId, deleteCard, zoomCard));
      closePopup(cardAddPopup);
      addFormElement.reset();
    })
    .catch((res) => console.log(res))
    .finally(() => {
      event.submitter.textContent = "Сохранить";
    });
});

editAvatarFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
  event.submitter.textContent = "Сохранить...";

  editAvatar(editAvatarFormUrlInput.value)
    .then((res) => {
      headerLogo.style.backgroundImage = `url(${res.avatar})`;
      closePopup(editAvatarPopup);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      event.submitter.textContent = "Сохранить";
    });
});

enableValidation(validationConfig); // валиадация

Promise.all([getUserInfo(), getCards()])
  .then(([userInfo, cards]) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    headerLogo.style.backgroundImage = `url(${userInfo.avatar})`;
    myId = userInfo._id;

    cards.forEach((card) => {
      const cardData = {
        name: card.name,
        link: card.link,
        likes: card.likes,
        cardId: card._id,
        ownerId: card.owner._id,
      };
      placesContainer.append(createCard(cardData, myId, deleteCard, zoomCard));
    });
  })
  .catch((error) => console.log(error));
