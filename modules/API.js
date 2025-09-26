const HOST = "https://wedev-api.sky.pro/api/v2/tatiana-ustinova";
const authHost = "https://wedev-api.sky.pro/api/user";

export let token = "";

export const setToken = (newToken) => {
  token = newToken;
};

export let name = "";

export const setName = (newName) => {
  name = newName;
};

export const fetchComments = () => {
  return fetch(HOST + "/comments")
    .then((res) => {
      return res.json();
    })
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
        };
      });
      return appComments;
    });
};

export const postComment = (text, name) => {
  return fetch(HOST + "/comments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text,
      name,
      forceError: true,
    }),
  })
    .then((res) => {
      if (res.status === 500) {
        throw new Error("Ошибка сервера");
      }

      if (res.status === 400) {
        throw new Error("Неверный запрос");
      }

      if (res.status === 201) {
        return res.json();
      }
    })
    .then(() => {
      return fetchComments();
    });
};
export const login = (login, password) => {
  return fetch(authHost + "/login", {
    method: "POST",
    body: JSON.stringify({ login: login, password: password }),
  }).then((res) => {
    if (res.status === 400) {
      throw new Error("Неверный запрос");
    }
    if (res.ok) {
      return res.json();
    }
  });
};

export const registration = (name, login, password) => {
  return fetch(authHost, {
    method: "POST",
    body: JSON.stringify({ name: name, login: login, password: password }),
  });
};
