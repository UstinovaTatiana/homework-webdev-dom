import {
  initAddCommentListener,
  initReplyListeners,
} from "./modules/initListeners.js";
import { renderComments } from "./modules/renderComments.js";
import { fetchComments } from "./modules/api.js";
import { updateComments } from "./modules/comments.js";

document.querySelector(".comments").innerHTML =
  "Пожалуйста подождите, идет загрузка комментариев...";

fetchComments().then((data) => {
  updateComments(data);
  renderComments();
});

initAddCommentListener();
initReplyListeners();
