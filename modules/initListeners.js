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

    if (!name.value || !text.value) {
      console.error("Введите комментарий");
      return;
    }

    postComment(sanitizeHtml(text.value), sanitizeHtml(name.value)).then(
      (data) => {
        updateComments(data);
        renderComments();
        name.value = "";
        text.value = "";
      },
    );
  });
};
