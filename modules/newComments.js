import { comments } from "./comments.js";
import { sanitizeHtml } from "./sanitizeHtml.js";

export const initAddCommentListener = (renderComments) => {
  const name = document.getElementById("name-input");
  const text = document.getElementById("text-input");
  const addButton = document.querySelector(".add-form-button");

  addButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (!name.value || !text.value) {
      console.error("Введите комментарий");
      return;
    }

    const newComment = {
      name: sanitizeHtml(name.value),
      date: new Date(),
      text: sanitizeHtml(text.value),
      likes: 0,
      isLiked: false,
    };

    comments.push(newComment);
    renderComments();

    name.value = "";
    text.value = "";
  });
};
