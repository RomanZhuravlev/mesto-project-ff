export function zoomCard(cardImage, cardDescription) {
  popupImage.src = cardImage;
  popupImage.alt = cardDescription;
  popupCaption.textContent = cardDescription;

  showPopup(imagePopup);
}