const HOST = "https://wedev-api.sky.pro/api/v1/tatiana-ustinova";

export const fetchComments = () => {
  return fetch(HOST + "/comments")
    .then((res) => {
      return res.json();
    })
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
        };
      });
      return appComments;
    });
};

export const postComment = (text, name) => {
  return fetch(HOST + "/comments", {
    method: "POST",
    body: JSON.stringify({
      text,
      name,
    }),
  }).then(() => {
    return fetchComments();
  });
};
