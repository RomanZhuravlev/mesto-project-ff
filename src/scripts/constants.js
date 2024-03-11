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

export {
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
  imagePopup,
  popupImage,
  popupCaption,
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
};
