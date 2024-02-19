import { cardTemplate } from "./index";
import { showPopup } from "./modal";

function createCard(cardData, onRemove, onLike, onZoom) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  deleteButton.addEventListener("click", () => onRemove(cardElement));
  cardLikeButton.addEventListener("click", (event) => onLike(event));
  cardImage.addEventListener("click", () =>
    onZoom(cardData.link, cardData.name)
  );

  return cardElement;
}

function removeCard(card) {
  card.remove();
}

function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

function zoomCard(cardImage, cardDescription) {
  showPopup(".popup_type_image", cardImage, cardDescription);
}

export { createCard, removeCard, likeCard, zoomCard };
