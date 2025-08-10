import { commentsData } from "./comments.js";

const commentsList = document.getElementById('comments-list');
let replyToCommentId = null;

export function renderComments() {
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