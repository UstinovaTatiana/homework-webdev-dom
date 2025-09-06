import { initAddCommentListener } from "./modules/newComments.js";
import { renderComments } from "./modules/renderComments.js";
import { addQuoteHandler } from "./modules/answer.js";

document.addEventListener("DOMContentLoaded", () => {
  renderComments();
  initAddCommentListener(renderComments);
  addQuoteHandler();
});
