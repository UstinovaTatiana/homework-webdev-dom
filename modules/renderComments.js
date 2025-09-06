import { comments } from "./comments.js";
import { initLikeListeners, initReplyListeners } from "./initListeners.js";

export const renderComments = () => {
  const commentsList = document.getElementById("comments-list");
  if (!commentsList) return;

  commentsList.innerHTML = "";

  comments.forEach((comment, index) => {
    const dateStr = new Date(comment.date).toLocaleString();

    const commentHTML = `
      <li class='comment' data-index='${index}'>
        <div class='comment-header'>
          <div>${comment.name}</div>
          <div>${dateStr}</div>
        </div>
        <div class='comment-body'>
          <div class='comment-text'>${comment.text}</div>
        </div>
        <div class='comment-footer'>
          <div class='likes'>
            <span class='likes-counter'>${comment.likes}</span>
            <button class='like-button ${comment.isLiked ? "-active-like" : ""}' data-index='${index}'></button>
          </div>
        </div>
      </li>
    `;

    commentsList.insertAdjacentHTML("beforeend", commentHTML);
  });

  initLikeListeners();
  initReplyListeners();
};
