import { renderComments } from "./modules/renderComments.js";
import { addNewCommentHandler } from "./modules/newComments.js";

document.addEventListener("DOMContentLoaded", () => {
  renderComments();

  const newNameInput = document.getElementById("new-name");
  const newTextInput = document.getElementById("new-text");

  addNewCommentHandler({ newNameInput, newTextInput, renderComments });
});
