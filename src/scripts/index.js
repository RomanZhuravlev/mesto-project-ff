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
import {
  placesContainer,
  profileAddButton,
  profileDescription,
  profileEditButton,
  profilePopup,
  profileTitle,
  headerLogo,
  popupInputName,
  popupInputDescription,
  cardAddPopup,
  editAvatarPopup,
  editFormElement,
  editFormNameInput,
  editFormJobInput,
  addFormElement,
  addFormNameInput,
  addFormLinkInput,
  editAvatarFormElement,
  editAvatarFormUrlInput,
  popups,
  validationConfig,
} from "./constants";
import { zoomCard } from "./utilities";
console.log(profilePopup);
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
