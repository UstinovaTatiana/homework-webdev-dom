import { getAndRender } from "../index.js";
import { registration, setName, setToken } from "./api.js";
import { renderLogin } from "./renderLogin.js";

export const renderRegistration = () => {
  const container = document.querySelector(".container");

  const loginHtml = `<section class="add-form">
      <h1>Форма регистрации</h1>
      <input
        type="text"
        class="add-form-name form-name"
        placeholder="Введите имя"
        id="name"
        required
      />
      <input
        type="text"
        class="add-form-name form-name"
        placeholder="Введите логин"
        id="login"
        required
      />
      <input
        type="password"
        class="add-form-name form-name"
        placeholder="Введите пароль"
        id="password"
        required
      ></input>
      <fieldset class="add-form-registry ">
        <button class="add-form-button-main registry form-registry" type="submit" id="button-main">
          Зарегистрироваться
        </button>
        <u class="add-form-button-link entry">Войти</u>
      </fieldset>
    </section>`;
  container.innerHTML = loginHtml;

  document.querySelector(".entry").addEventListener("click", () => {
    renderLogin();
  });

  const nameEl = document.querySelector("#name");
  const loginEl = document.querySelector("#login");
  const passwordEl = document.querySelector("#password");
  const submitButtonEl = document.querySelector(".registry");

  submitButtonEl.addEventListener("click", () => {
    registration(nameEl.value, loginEl.value, passwordEl.value)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setToken(data.user.token);
        setName(data.user.name);
        getAndRender();
      });
  });
};
