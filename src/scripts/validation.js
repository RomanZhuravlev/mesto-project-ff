// показ ошибок
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) => {
  const { inputErrorClass, errorClass } = validationConfig;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// скрытие ошибок
const hideInputError = (formElement, inputElement, validationConfig) => {
  const { inputErrorClass, errorClass } = validationConfig;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

// проверка инпута на валидность
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  // проверка регулярным выражением
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"
    );
  } else {
    inputElement.setCustomValidity("");
  }
  // общая проверка
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

// проверка на невалидные инпуты
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// смена состояния кнопки submit
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// обход и обработка всех инпутов
const setEventListeners = (formElement, formConfig) => {
  const { inputSelector, submitButtonSelector, ...validationConfig } =
    formConfig; // продолжаем деструктурировать объект
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement); // сразу проверяем инпуты и если нужно меняем состояние кнопки

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, validationConfig); // после каждого взаим-я с инпутами проверяем на валидность
      toggleButtonState(
        inputList,
        buttonElement,
        validationConfig.inactiveButtonClass
      ); // постоянно проверяем инпуты и меняем статус кнопки если нужно
    });
  });
};

// обход и обработка всех форм
const enableValidation = (validationConfig) => {
  // обработка конфига делает ф-ию универсальной
  const { formSelector, ...formConfig } = validationConfig; // с помощью деструктуризации работаем с объектом
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, formConfig); // передаем измененный объект в следующую ф-ию
  });
};

// очистка ошибок
const clearValidation = (profileForm, validationConfig) => {
  const { inputSelector, submitButtonSelector, inactiveButtonClass } =
    validationConfig; // деструктурируем объект
  const inputList = Array.from(profileForm.querySelectorAll(inputSelector));
  const buttonElement = profileForm.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass); // меняем состояние кнопки

  inputList.forEach((inputElement) => {
    // обходим все инпуты и скрываем ошибки
    hideInputError(profileForm, inputElement, validationConfig);
  });
};

export { enableValidation, clearValidation };
