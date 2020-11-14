module.exports =
  class putlikesCountInPosts {

    formatPostsData(likes, posts, user) {
      const formatPosts = [];
      posts.forEach(post => {
        const userLike = likes.find(like => like.post_id === post.id && like.user_id === user.id) ? true : false;
        const count = likes.filter(like => like.post_id === post.id);
        const postData = {
          id: post.id,
          title: post.title,
          text: post.text,
          userId: post.user_id,
          auther: post.auther,
          likeCount: count.length,
          userLike
        }
        formatPosts.push(postData);
      })
      return formatPosts;
    }

  };