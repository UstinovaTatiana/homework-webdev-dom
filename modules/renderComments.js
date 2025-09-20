import { comments } from "./comments.js";
import { initLikeListeners, initReplyListeners } from "./initListeners.js";
import { renderLogin } from "./renderLogin.js";
import { name, token } from "./api.js";
import { initAddCommentListener } from "./initListeners.js";

export const renderComments = () => {
  const container = document.querySelector(".container");

  const commentsHTML = comments
    .map((comment, index) => {
      return `
      <li class='comment' data-index='${index}'>
        <div class='comment-header'>
          <div>${comment.name}</div>
          <div>${new Date(comment.date).toLocaleString()}</div>
        </div>
        <div class='comment-body'>
          <div class='comment-text'>${comment.text}</div>
        </div>
        <div class='comment-footer'>
          <div class='likes'>
            <span class='likes-counter'>${comment.likes}</span>
            <button class='like-button ${comment.isLiked ? "-active-like" : ""}' data-index='${index}'></button>
          </div>
        </div>
      </li>
    `;
    })
    .join("");

  const addCommentsHtml = `<div class="container">
      <div class="add-form" id="reply-modal">
        <div class="add-form__comment" id="original-comment"></div>
        <input
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
          readonly
          value="${name}"
          id="name-input"
        />
        <textarea
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          id="text-input"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button type="button" class="add-form-button" id="add-comment">
            Написать
          </button>
        </div>
      </div>
      <div class="form-loading" style="display: none; margin-top: 20px;">
        Комментарий добавляется ...
      </div>
       </div>`;

  const linkToLoginText = `<p>чтобы отправить комментарий, <span class= "link-login">авторизуйтесь</span></p>`;

  const baseHtml = `<ul class="comments">${commentsHTML}</ul>
      ${token ? addCommentsHtml : linkToLoginText}`;

  container.innerHTML = baseHtml;

  if (token) {
    initLikeListeners();
    initReplyListeners();
    initAddCommentListener();
    initReplyListeners();
  } else {
    document.querySelector(".link-login").addEventListener("click", () => {
      renderLogin();
    });
  }
};
