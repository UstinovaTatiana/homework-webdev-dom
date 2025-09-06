import { comments } from "./comments.js";
import { renderComments } from "./renderComments.js";

export function addQuoteHandler() {
  const commentsList = document.getElementById("comments-list");
  const overlay = document.getElementById("overlay");
  const replyModal = document.getElementById("reply-modal");
  const originalCommentDiv = document.getElementById("original-comment");
  const name = document.getElementById("name-input");
  const text = document.getElementById("text-input");
  // Храним индекс родителя, к которому пишем ответ
  let replyToCommentIndex = null;

  if (!commentsList) return;

  // Выбор родителя
  commentsList.addEventListener("click", (e) => {
    const li = e.target.closest("li.comment");
    if (!li) return;

    const index = parseInt(li.dataset.index, 10);
    if (isNaN(index)) return;

    const comment = comments[index];
    if (!comment) return;

    replyToCommentIndex = index;

    originalCommentDiv.innerHTML = `
      <strong>Ответ на:</strong> ${comment.name} (${comment.date})<br/>
      ${comment.text}
    `;
    overlay.style.display = "block";
    replyModal.style.display = "";

    // Очистка полей ввода перед новым ответом
    name.value = "";
    text.value = "";
  });

  // Закрытие модалки
  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    replyModal.style.display = "none";
    replyToCommentIndex = null;
  });

  const addCommentBtn = document.getElementById("add-comment");

  if (addCommentBtn) {
    addCommentBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation(); // блокируем другие обработчики на этой кнопке (если используются)

      if (replyToCommentIndex === null) {
        return;
      }

      const answerText = text.value.trim();
      if (!answerText) {
        alert("Пожалуйста, введите ответ");
        return;
      }

      const userNameVal = (name.value || "Аноним").trim();

      const parentComment = comments[replyToCommentIndex];
      if (parentComment) {
        parentComment.replies = parentComment.replies || [];
        parentComment.replies.push({
          name: userNameVal,
          date: new Date(),
          text: answerText,
        });

        // Обновить отображение
        renderComments();

        // Очистка и закрытие модалки
        name.value = "";
        text.value = "";
        originalCommentDiv.innerHTML = "";
        overlay.style.display = "none";
        replyModal.style.display = "none";
        replyToCommentIndex = null;
      }
    });
  }
}
