import { postComment } from "./api.js";
import { comments, updateComments } from "./comments.js";
import { renderComments } from "./renderComments.js";
import { sanitizeHtml } from "./sanitizeHtml.js";

export const initLikeListeners = () => {
  const likeButtons = document.querySelectorAll(".like-button");

  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();

      const index = likeButton.dataset.index;
      const comment = comments[index];

      comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;

      comment.isLiked = !comment.isLiked;

      renderComments();
    });
  }
};
export const initReplyListeners = () => {
  const commentsElements = document.querySelectorAll(".comment");

  const text = document.getElementById("text-input");

  for (const commentElement of commentsElements) {
    commentElement.addEventListener("click", () => {
      const currentComment = comments[commentElement.dataset.index];
      text.value = `${currentComment.name}: ${currentComment.text}
      \n *****
      \n`;
    });
  }
};

export const initAddCommentListener = () => {
  const name = document.getElementById("name-input");
  const text = document.getElementById("text-input");
  const addButton = document.querySelector(".add-form-button");

  addButton.addEventListener("click", (e) => {
    e.preventDefault();
    const nameTrimmed = name.value.trim();
    const textTrimmed = text.value.trim();
    if (!nameTrimmed || !textTrimmed) {
      alert("Введите комментарий");
      return;
    }

    document.querySelector(".form-loading").style.display = "block";
    document.querySelector(".add-form").style.display = "none";

    postComment(sanitizeHtml(text.value), sanitizeHtml(name.value))
      .then((data) => {
        document.querySelector(".form-loading").style.display = "none";
        document.querySelector(".add-form").style.display = "flex";

        updateComments(data);
        renderComments();
        name.value = "";
        text.value = "";
      })
      .catch((error) => {
        document.querySelector(".form-loading").style.display = "none";
        document.querySelector(".add-form").style.display = "flex";
        if (error.message === "Неверный запрос") {
          alert("Имя и комментарий должны быть не короче 3 символов");
        }
        if (error.message === "Ошибка сервера") {
          alert("Сервер сломался, попробуй позже");
        }
        if (error.message === "Failed to fetch") {
          alert("Кажется, у вас сломался интернет, попробуйте позже");
        }
      });
  });
};
