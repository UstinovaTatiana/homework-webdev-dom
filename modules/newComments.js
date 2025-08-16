import { commentsData } from "./comments.js";
//import { renderComments } from "./renderComments.js";

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

export function addNewCommentHandler(params) {
  const { newNameInput, newTextInput, renderComments } = params;

  const addBtn = document.getElementById("add-comment");
  if (!addBtn) return;

  addBtn.onclick = () => {
    const nameVal = newNameInput.value.trim();
    const textValRaw = newTextInput.value.trim();

    if (nameVal === "" || textValRaw === "") {
      alert("Пожалуйста, заполните оба поля");
      return;
    }

    const currentDateTime = formatCurrentDate();

    commentsData.push({
      id: Date.now(),
      name: nameVal,
      date: currentDateTime,
      text: textValRaw,
      likesCount: 0,
      liked: false,
      replies: [],
    });

    newNameInput.value = "";
    newTextInput.value = "";

    renderComments();
  };
}
