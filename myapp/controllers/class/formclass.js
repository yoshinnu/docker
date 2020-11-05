module.exports =
  class postForm {
    //mypostを抜き出す
    formatmyPosts(posts, myid) {
      let mypostdata = [];
      posts.forEach(post => {
        if (post.user_id === myid) {
          mypostdata.push(post);
        }
      })
      return mypostdata;
    }
    //mypost以外を抜き出す
    formatOtherPosts(posts, myid) {
      let otherpostdata = [];
      posts.forEach(post => {
        if (post.user_id !== myid) {
          otherpostdata.push(post);
        }
      })
      return otherpostdata;
    }
  };