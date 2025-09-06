import { initAddCommentListener } from "./modules/initListeners.js";
import { renderComments } from "./modules/renderComments.js";
import { initReplyListeners } from "./modules/initListeners.js";
import { fetchComments } from "./modules/api.js";
import { updateComments } from "./modules/comments.js";

fetchComments().then((data) => {
  updateComments(data);
  renderComments();
});

initAddCommentListener();
initReplyListeners();
