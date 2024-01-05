const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-4",
  headers: {
    authorization: "74dd0d65-9856-4f64-bb86-97d9403b4cb0",
    "Content-Type": "application/json",
  },
};

export const initialization = new Promise((resolve, reject) => {
  fetch("https://nomoreparties.co/v1/wff-cohort-4/users/me", {
    method: "GET",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        resolve(res.json());
      }
    })
    .catch((err) => {
      reject(`Ошибка: ${err.status}`);
    });
});

export const downloadCards = new Promise((resolve, reject) => {
  fetch("https://nomoreparties.co/v1/wff-cohort-4/cards", {
    method: "GET",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        resolve(res.json());
      }
    })
    .catch((err) => {
      reject(`Ошибка: ${err.status}`);
    });
});

export const updatedUserData = (data) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-4/users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.job,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return `Ошибка: ${err.status}`;
    });
};

export function createNewPost(data) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-4/cards", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      link: data.dataCard.link,
      name: data.dataCard.name,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return `Ошибка: ${err.status}`;
    });
}

export const deletionRequest = (card) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-4/cards/" + card, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      return `Ошибка: ${err.status}`;
    });
};

export const requestForLike = (cardId) => {
  return fetch(
    "https://nomoreparties.co/v1/wff-cohort-4/cards/likes/" + cardId,
    {
      method: "PUT",
      headers: config.headers,
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return `Ошибка: ${err.status}`;
    });
};

export const requestForDeleteLike = (cardId) => {
  return fetch(
    "https://nomoreparties.co/v1/wff-cohort-4/cards/likes/" + cardId,
    {
      method: "DELETE",
      headers: config.headers,
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return `Ошибка: ${err.status}`;
    });
};

export const requestChacgeAvatar = (linkImg) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-4/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "74dd0d65-9856-4f64-bb86-97d9403b4cb0",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: linkImg,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return `Ошибка: ${err.status}`;
    });
};
