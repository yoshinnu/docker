module.exports =
  class putlikesCountInPosts {

    formatPostsData(likes, posts, user) {
      const formatPosts = [];
      posts.forEach(post => {
        let count = 0;
        let userLike = 'off'
        likes.forEach(like => {
          if (like.post_id === post.id) {
            count++;
            if (like.user_id === user.id) {
              userLike = 'on';
            }
          }
        })
        let postData = {
          id: post.id,
          title: post.title,
          text: post.text,
          userId: post.user_id,
          auther: post.auther,
          likeCount: count,
          userLike: userLike
        }
        formatPosts.push(postData);
      })
      return formatPosts;
    }

  };