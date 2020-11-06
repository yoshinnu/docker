module.exports =
  class postForm {
    //mypostを抜き出す
    formatmyPosts(posts, myid) {
      let mypostdata = [];
      posts.forEach(post => {
        if (post.user_id === myid) {
          let mypost = {
            id: post.id,
            title: post.title,
            text: post.text,
            user_id: post.user_id,
            auther: post.auther,
            myid: myid
          }
          mypostdata.push(mypost);
        }
      })
      return mypostdata;
    }
    //mypost以外を抜き出す
    formatOtherPosts(posts, myid) {
      let otherpostdata = [];
      posts.forEach(post => {
        if (post.user_id !== myid) {
          let otherpost = {
            id: post.id,
            title: post.title,
            text: post.text,
            user_id: post.user_id,
            auther: post.auther,
            myid: myid
          }
          otherpostdata.push(otherpost);
        }
      })
      return otherpostdata;
    }
  };