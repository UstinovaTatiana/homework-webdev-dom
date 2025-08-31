import { commentsData } from "./comments.js";
import { renderComments } from "./renderComments.js";

function formatCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const yearShort = year.toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${day}.${month}.${yearShort} ${hours}:${minutes}`;
}

export function addQuoteHandler() {
  const commentsList = document.getElementById("comments-list");
  const overlay = document.getElementById("overlay");
  const replyModal = document.getElementById("reply-modal");
  const originalCommentDiv = document.getElementById("original-comment");
  const replyTextarea = document.getElementById("new-text");
  const replyNameInput = document.getElementById("new-name");

  let replyToCommentId = null;

  if (!commentsList) return;

  commentsList.addEventListener("click", (e) => {
    if (e.target.closest("li.comment")) {
     
      const li = e.target.closest("li.comment");
      const id = parseInt(li.dataset.id);
      const comment = commentsData.find((c) => c.id === id);
      if (!comment) return;

      replyToCommentId = id;

      originalCommentDiv.innerHTML = `
          <strong>Ответ на:</strong> ${comment.name} (${comment.date})<br/>
          ${comment.text}
        `;
      overlay.style.display = "block";
      replyModal.style.display = "";

     
      replyNameInput.value = "";
      replyTextarea.value = "";
    }
  });

  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    replyModal.style.display = "none";
    replyToCommentId = null;
  });

  
  const addCommentBtn = document.getElementById("add-comment");
  addCommentBtn.onclick = () => {
    if (replyToCommentId !== null) {
      const answerText = replyTextarea.value.trim();
      if (!answerText) {
        alert("Пожалуйста, введите ответ");
        return;
      }

      const userNameVal = replyNameInput.value.trim() || "Аноним";

      const dateStr = formatCurrentDate();

      const parentComment = commentsData.find((c) => c.id === replyToCommentId);

      if (parentComment) {
        parentComment.replies.push({
          name: userNameVal,
          date: dateStr,
          text: answerText,
        });
        renderComments();

       
        replyNameInput.value = "";
        replyTextarea.value = "";
        originalCommentDiv.innerHTML = "";
        replyToCommentId = null;
      }

      return;
    }

  
  };
}
