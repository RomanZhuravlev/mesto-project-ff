import { handleEscape } from "./modal";
import { toggleLike } from "./api";

const cardTemplate = document.querySelector("#card-template").content;
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

function createCard(cardData, myUserId, onRemove, onZoom) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");

  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  // вешаем иконки мусорки только на созданные нами карточки
  if (myUserId === cardData.ownerId) {
    deleteButton.addEventListener("click", () => {
      // удаление с сервера
      onRemove(cardData.cardId)
        .then(() => {
          // удаление из DOM
          removeCard(cardElement);
        })
        .catch((error) => console.log(error));
    });
  } else {
    deleteButton.remove(); // если карта не наша - удаляем иконку
  }

  // обработка лайков
  function renderLikes(card) {
    cardLikeCounter.textContent = card.likes.length; // выводим число лайков в счетчик
    if (card.likes.some((like) => like._id === myUserId)) {
      cardLikeButton.classList.add("card__like-button_is-active"); // если мы лайкали карточку - лайк закрашен
    } else {
      cardLikeButton.classList.remove("card__like-button_is-active"); // если не лайкали - лайк незакрашен
    }
  }

  renderLikes(cardData); // первичная проверка

  cardLikeButton.addEventListener("click", () => {
    // в обработчик передаем универсальную ф-ию которая может либо удалять, либо вносить
    toggleLike(
      cardData.cardId,
      cardLikeButton.classList.contains("card__like-button_is-active")
    )
      .then((data) => {
        // меняем состояния после ответа сервера
        renderLikes(data);
      })
      .catch((error) => console.log(error));
  });

  cardImage.addEventListener("click", () =>
    onZoom(cardData.link, cardData.name)
  );

  return cardElement;
}

function removeCard(card) {
  card.remove();
}

function zoomCard(cardImage, cardDescription) {
  popupImage.src = cardImage;
  popupImage.alt = cardDescription;
  popupCaption.textContent = cardDescription;

  imagePopup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);
}

export { createCard, removeCard, zoomCard };
