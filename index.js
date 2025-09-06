import { initAddCommentListener } from "./modules/initListeners.js";
import { renderComments } from "./modules/renderComments.js";
import { initReplyListeners } from "./modules/initListeners.js";

renderComments();
initAddCommentListener();
initReplyListeners();
