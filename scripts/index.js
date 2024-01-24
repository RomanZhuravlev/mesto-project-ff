// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData, onRemove) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const deleteButton = cardElement.querySelector('.card__delete-button');

	cardElement.querySelector('.card__title').textContent = cardData.name;
	cardElement.querySelector('.card__image').src = cardData.link;
	cardElement.querySelector('.card__image').alt = cardData.name;

	const card = cardElement;
	deleteButton.addEventListener('click', () => removeCard(card));

	return cardElement
}

function removeCard(card) {
	card.remove();
}

initialCards.forEach(function(item) {
	const card = createCard(item, removeCard);
	placesContainer.append(card);
})