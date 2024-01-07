const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-4",
  headers: {
    authorization: "74dd0d65-9856-4f64-bb86-97d9403b4cb0",
    "Content-Type": "application/json",
  },
};
function OutputError(err) {
  return Promise.reject(`Ошибка: ${err}`);
}

export const getUserInfo = fetch(`${config.baseUrl}/users/me`, {
  method: "GET",
  headers: config.headers,
}).then((res) => {
  if (res.ok) {
    return res.json();
  }
  return OutputError(res.status);
});
export const getCards = fetch(`${config.baseUrl}/cards`, {
  method: "GET",
  headers: config.headers,
}).then((res) => {
  if (res.ok) {
    return res.json();
  }
  return OutputError(res.status);
});

export const updateUserServerInfo = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.job,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return OutputError(res.status);
  });
};

export const createNewPost = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      link: data.dataCard.link,
      name: data.dataCard.name,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return OutputError(res.status);
  });
};

export const deleteCard = (card) => {
  return fetch(`${config.baseUrl}/cards/` + card, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return OutputError(res.status);
  });
};

export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/` + cardId, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return OutputError(res.status);
  });
};

export const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/` + cardId, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return OutputError(res.status);
  });
};

export const changeAvatar = (linkImg) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: "74dd0d65-9856-4f64-bb86-97d9403b4cb0",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: linkImg,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return OutputError(res.status);
  });
};
