import { updateComments } from "./comments";
import { renderComments } from "./renderComments";
import { fetchComments } from "./modules/api.js";

export const fetchAndRenderTasks = () => {
  fetchComments().then((data) => {
    updateComments(data);
    renderComments();
  });
};
