import { comments } from "./comments.js";

export const initLikeListeners = (renderComments) => {
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
