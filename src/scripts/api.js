const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-7",
  headers: {
    authorization: "dfd432e7-8dee-4b29-8ba8-64f22dc5eee3",
    "Content-Type": "application/json",
  },
};

// проверка ответа
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return res
    .json() // вытащим ответ сервера
    .then((error) => {
      error.httpResponseCode = res.status;
      return Promise.reject(error);
    });
}

export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
}

export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
}

export function editProfile(name, job) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: job,
    }),
  }).then(checkResponse);
}

export function addCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkResponse);
}

export function deleteCard(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

export function toggleLike(id, isLiked) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: config.headers,
  }).then(checkResponse);
}

export function editAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(checkResponse);
}
