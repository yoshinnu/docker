module.exports =
  class postForm {
    //myPostを抜き出す
    formatmyPosts(posts, userId) {
      let myPostData = [];
      posts.forEach(post => {
        if (post.user_id === userId) {
          let myPost = {
            id: post.id,
            title: post.title,
            text: post.text,
            userId: post.userId,
            auther: post.auther
          }
          myPostData.push(myPost);
        }
      })
      return myPostData;
    }
    //myPost以外を抜き出す
    formatOtherPosts(posts, userId) {
      let otherPostData = [];
      posts.forEach(post => {
        if (post.user_id !== userId) {
          let otherPost = {
            id: post.id,
            title: post.title,
            text: post.text,
            userId: post.userId,
            auther: post.auther,
          }
          otherPostData.push(otherPost);
        }
      })
      return otherPostData;
    }
  };