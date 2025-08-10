 const commentsData = [
    {
      id: 1,
      name: "Глеб Фокин",
      date: "12.02.22 12:18",
      text: "Это будет первый комментарий на этой странице",
      likesCount: 3,
      liked: false,
      replies: []
    },
    {
      id: 2,
      name: "Варвара Н.",
      date: "13.02.22 19:22",
      text: "Мне нравится как оформлена эта страница! ❤",
      likesCount: 75,
      liked: true,
      replies: []
    }
  ];

  const commentsList = document.getElementById('comments-list');
  const newNameInput = document.getElementById('new-name');
  const newTextInput = document.getElementById('new-text');
  const addCommentBtn = document.getElementById('add-comment');

  const replyModal = document.getElementById('reply-modal');
  const overlay = document.getElementById('overlay');
  const originalCommentDiv = document.getElementById('original-comment');
  const replyTextarea = document.getElementById('new-text');
  const userNameInput = document.getElementById('new-name');

  let replyToCommentId = null;

  function renderComments() {
    commentsList.innerHTML = '';

    commentsData.forEach(comment => {
      let commentHTML = `
<li class='comment' data-id='${comment.id}'>
<div class='comment-header'>
<div>${comment.name}</div><div>${comment.date}</div></div>
<div class='comment-body'>
<div class='comment-text'>${comment.text}</div></div>
<div class='comment-footer'>
<div class='likes'>
<span class='likes-counter'>${comment.likesCount}</span>
<button class='like-button ${comment.liked ? '-active-like' : ''}'></button></div>`;


      if (comment.replies && comment.replies.length > 0) {
        commentHTML += `<div class='replies'>`;

        if (replyToCommentId && comment.id === replyToCommentId) {

          const parentComment = commentsData.find(c => c.id === replyToCommentId);
          if (parentComment) {
            commentHTML += `<div class='reply-to'><strong>Ответ на:</strong> ${parentComment.name} (${parentComment.date})</div>`;
          }
        }
        comment.replies.forEach(reply => {
          commentHTML += `
     <div class= "reply">
       <strong class= "reply-header">${reply.name}</strong> (${reply.date}):<br/>
       ${reply.text}
     </div>`;
        });
        commentHTML += `</div>`;
      }

      commentHTML += `</li>`;

      commentsList.insertAdjacentHTML('beforeend', commentHTML);
    });
  }

  renderComments();


  commentsList.addEventListener('click', (e) => {
    if (e.target.className.includes('like-button')) {
      e.stopPropagation();
      const li = e.target.closest('li.comment');
      const id = parseInt(li.dataset.id);
      const comment = commentsData.find(c => c.id === id);
      if (comment) {
        comment.liked = !comment.liked;
        if (comment.liked) comment.likesCount++;
        else comment.likesCount--;
        renderComments();
      }
    } else if (e.target.closest('li.comment')) {

      const li = e.target.closest('li.comment');
      const id = parseInt(li.dataset.id);
      const comment = commentsData.find(c => c.id === id);
      if (comment) {
        replyToCommentId = id;

        originalCommentDiv.innerHTML = `
           <strong>Ответ на:</strong> ${comment.name} (${comment.date})<br/>
           ${comment.text}
         `;
        overlay.style.display = 'block';
        replyModal.style.display = '';


        document.getElementById('new-name').value = '';
        replyTextarea.value = '';

      }
    }
  });

  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    replyModal.style.display = 'none';
    replyToCommentId = null;
  });


  document.getElementById('add-comment').onclick = () => {
    if (replyToCommentId !== null) {

      const answerText = replyTextarea.value.trim();
      if (!answerText) { alert("Пожалуйста, введите ответ"); return; }

      const userNameVal = document.getElementById('new-name').value.trim() || 'Аноним';

      const now = new Date();
      const year = now.getFullYear();
      const yearShort = year.toString().slice(-2);
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');

      const dateStr = `${day}.${month}.${yearShort} ${hours}:${minutes}`;


      const parentComment = commentsData.find(c => c.id === replyToCommentId);

      if (parentComment) {
        parentComment.replies.push({
          name: userNameVal,
          date: dateStr,
          text: answerText
        });
        renderComments();


        document.getElementById('new-name').value = '';
        replyTextarea.value = '';
        originalCommentDiv.innerHTML = '';
        replyToCommentId = null;
      }

      return;
    }


    const nameVal = newNameInput.value.trim();
    const textValRaw = newTextInput.value.trim();

    if (nameVal === '' || textValRaw === '') { alert("Пожалуйста, заполните оба поля"); return; }

    const now = new Date();
    const year = now.getFullYear();
    const yearShort = year.toString().slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const currentDateTime = `${day}.${month}.${yearShort} ${hours}:${minutes}`;

    commentsData.push({
      id: Date.now(),
      name: nameVal,
      date: currentDateTime,
      text: textValRaw,
      likesCount: 0,
      liked: false,
      replies: []
    });

    newNameInput.value = '';
    newTextInput.value = '';

    renderComments();
  };