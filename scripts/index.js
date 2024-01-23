// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesContainer = document.querySelector('.places__list');

function addCard(cardTitle, cardLink, removeFunc) {
	const cardTemplate = document.querySelector('#card-template').content;
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const deleteButton = cardElement.querySelector('.card__delete-button');

	cardElement.querySelector('.card__title').textContent = cardTitle;
	cardElement.querySelector('.card__image').src = cardLink;

	deleteButton.addEventListener('click', removeFunc);

	placesContainer.append(cardElement);
}

function removeCard(evt) {
	evt.target.closest('.card').remove();
}

initialCards.forEach(function(item) {
	addCard(item.name, item.link, removeCard);
})