import {renderComments} from "./modules/renderComments.js";
import { initListeners } from "./modules/initListeners.js";


document.addEventListener("DOMContentLoaded", () => {
  renderComments();
  initListeners();
});

