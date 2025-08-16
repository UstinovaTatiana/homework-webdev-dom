import { commentsData } from "./comments.js";
import { renderComments } from "./renderComments.js";

export function addLikeHandler() {
  const commentsList = document.getElementById("comments-list");
  if (!commentsList) return;

  commentsList.addEventListener("click", (e) => {
    if (e.target.className.includes("like-button")) {
      e.stopPropagation();
      const li = e.target.closest("li.comment");
      const id = parseInt(li.dataset.id);
      const comment = commentsData.find((c) => c.id === id);
      if (comment) {
        comment.liked = !comment.liked;
        if (comment.liked) comment.likesCount++;
        else comment.likesCount--;
        renderComments();
      }
    }
  });
}
