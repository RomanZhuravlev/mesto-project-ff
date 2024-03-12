import { imagePopup, popupImage, popupCaption } from "./constants";
import { showPopup } from "./modal";

export function zoomCard(cardImage, cardDescription) {
  popupImage.src = cardImage;
  popupImage.alt = cardDescription;
  popupCaption.textContent = cardDescription;

  showPopup(imagePopup);
}
