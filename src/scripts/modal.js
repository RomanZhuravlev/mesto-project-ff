import {
  profileTitle,
  profileDescription,
  editFormNameInput,
  editFormJobInput,
} from "./index";

// комплексная функция открытия попапа
function showPopup(popupClass, zoomPopupImage, zoomPopupDescription) {
  const popupToOpen = document.querySelector(popupClass);
  popupToOpen.classList.add("popup_is-opened"); // открытие попапа

  // если переданный попап - редактирование, тогда заполняем инпуты текстом из инфо профиля
  if (popupClass === ".popup_type_edit") {
    const popupInputName = popupToOpen.querySelector(".popup__input_type_name");
    const popupInputDescription = popupToOpen.querySelector(
      ".popup__input_type_description"
    );
    popupInputName.value = profileTitle.textContent;
    popupInputDescription.value = profileDescription.textContent;
  }

  // если переданный попап - раскрытие карточки, тогда вставляем фото и текст, которые передаются в showPopup специально для этого попапа
  if (popupClass === ".popup_type_image") {
    const popupImage = popupToOpen.querySelector(".popup__image");
    const popupCaption = popupToOpen.querySelector(".popup__caption");
    popupImage.src = zoomPopupImage;
    popupCaption.textContent = zoomPopupDescription;
  }

  const popupCloseButton = popupToOpen.querySelector(".popup__close");
  // добавление слушателей и передача им разных обработчиков сразу внутри функции showPopup делает эту функцию более гибкой и многофункциональной
  popupCloseButton.addEventListener("click", closePopupWithButton); // закрытие по крестику
  popupToOpen.addEventListener("click", closePopupWithOverlay); // закрытие по фону
  document.addEventListener(
    "keydown",
    (event) => closePopupWithEscape(event, popupToOpen) // закрытие Esc'ом
  );
}

// закрытие попапа крестиком
function closePopupWithButton(event) {
  const openedPopup = event.target.closest(".popup_is-opened");
  openedPopup.classList.remove("popup_is-opened");
}

// закрытие попапа нажатием на задний план
function closePopupWithOverlay(event) {
  if (event.target.classList.contains("popup_is-opened")) {
    event.target.classList.remove("popup_is-opened");
  }
}

// закрытие попапа Esc'ом, также принимает попап, который надо закрыть
function closePopupWithEscape(event, openedPopup) {
  if (event.key === "Escape") {
    openedPopup.classList.remove("popup_is-opened");
  }
}

// Обработчик «отправки» формы
function handleFormSubmit(event) {
  event.preventDefault();

  const nameInputText = editFormNameInput.value; // взятие значений из каждого input
  const jobInputText = editFormJobInput.value;

  profileTitle.textContent = nameInputText; // подстановка текста в инфо профиля
  profileDescription.textContent = jobInputText;

  const openedPopup = event.target.closest(".popup_is-opened"); // закрытие попапа при отправке формы, после сохранения данных
  openedPopup.classList.remove("popup_is-opened");
}

export { showPopup, handleFormSubmit };
