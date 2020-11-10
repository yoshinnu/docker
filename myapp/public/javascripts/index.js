const url = 'http://localhost:3000/index/post';
const index = document.getElementById("index");
const edit = '/edit';
const truncate = '/edit/delete';
const chekedHeart = '♥';
const heart = '♡';
//画面に表示させる記事作成
window.addEventListener('load', function () {
  fetch(url)
    .then(res => res.json())
    .then(body => {
      const posts = body.postData;
      const user = body.user;
      posts.forEach(post => {
        //要素の定義
        const div = document.createElement('div');
        const container = document.createElement('div');
        const text = document.createElement('p');
        const auther = document.createElement('p');
        const postTitle = document.createElement('h3');
        const hiddenUpdate = document.createElement('input');
        const hiddenDelete = document.createElement('input');
        const updateInput = document.createElement('input');
        const deleteInput = document.createElement('input');
        const updateForm = document.createElement('form');
        const deleteForm = document.createElement('form');
        const like = document.createElement('a');
        const likeCount = document.createElement('p');
        //作成開始
        container.classList.add('container');
        index.appendChild(container);
        postTitle.textContent = post.title;
        container.appendChild(postTitle);
        container.appendChild(div);
        text.textContent = post.text;
        div.appendChild(text);
        container.appendChild(div);
        auther.textContent = '投稿者: ' + post.auther;
        div.appendChild(auther);
        like.value = post.id;
        like.href = '#';
        like.style.textDecoration = 'none';
        like.style.display = 'inline-block';
        if (post.userLike === 'on') {
          like.textContent = chekedHeart;
          like.onclick = function () { likeCheckDelete(post, like, likeCount); };
        } else {
          like.textContent = heart;
          like.onclick = function () { likeCheck(post, like, likeCount); };
        }
        div.appendChild(like);
        likeCount.textContent = post.likeCount;
        likeCount.style.display = 'inline-block';
        div.appendChild(likeCount);
        //userの投稿の場合更新と削除ボタンを追加
        if (post.userId === user.id) {
          updateForm.action = edit;
          updateForm.method = 'GET';
          updateForm.style.display = 'inline-block';
          container.appendChild(updateForm);
          hiddenUpdate.type = 'hidden';
          hiddenUpdate.name = 'id';
          hiddenUpdate.value = post.id;
          updateInput.type = 'submit';
          updateInput.value = '更新';
          updateForm.appendChild(hiddenUpdate);
          updateForm.appendChild(updateInput);
          deleteForm.action = truncate;
          deleteForm.method = 'POST';
          deleteForm.style.display = 'inline-block';
          container.appendChild(deleteForm);
          hiddenDelete.type = 'hidden';
          hiddenDelete.name = 'id';
          hiddenDelete.value = post.id;
          deleteInput.type = 'submit';
          deleteInput.value = '削除';
          deleteForm.appendChild(hiddenDelete);
          deleteForm.appendChild(deleteInput);
        }
      });
    });
});
function likeCheck(post, like, count) {
  const postId = { postId: post.id };
  const method = "POST";
  const body = Object.keys(postId).map((key) => key + "=" + encodeURIComponent(postId[key])).join("&");
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  };
  like.textContent = chekedHeart;
  like.onclick = '';
  count.textContent++;
  fetch("/index/likecheck", { method, headers, body })
    .then(res => {
      like.onclick = function () { likeCheckDelete(post, like, count); };
    })
    .catch(console.error);
}
function likeCheckDelete(post, like, count) {
  const postId = { postId: post.id };
  const method = "POST";
  const body = Object.keys(postId).map((key) => key + "=" + encodeURIComponent(postId[key])).join("&");
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  };
  like.textContent = heart;
  like.onclick = '';
  count.textContent--;
  fetch("/index/deletelike", { method, headers, body })
    .then(res => {
      like.onclick = function () { likeCheck(post, like, count); };
    })
    .catch(console.error);
}