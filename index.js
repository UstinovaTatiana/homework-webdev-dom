import { renderComments } from "./modules/renderComments.js";
import { fetchComments } from "./modules/api.js";
import { updateComments } from "./modules/comments.js";

export const getAndRender = (isFirstLoading) => {
  if (isFirstLoading) {
    document.querySelector(".container").innerHTML =
      `<p>Пожалуйста подождите, идет загрузка комментариев...</p>`;
  }

  fetchComments().then((data) => {
    updateComments(data);
    renderComments();
  });
};

getAndRender(true);
