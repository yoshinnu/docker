const url = 'http://localhost:3000/index/post';
const index = document.getElementById("index");
const edit = '/edit';
const truncate = '/edit/delete';
const emptyHeart = 'far fa-heart';
const checkedHeart = 'fas fa-heart';
let posts;
let user;
//画面に表示させる記事作成
window.addEventListener('load', function () {
  fetch(url)
    .then(res => res.json())
    .then(body => {
      posts = body.postData;
      user = body.user;
      let i = 0;
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
        const heart = document.createElement('i');
        //作成開始
        container.classList.add('listbox');
        index.appendChild(container);
        postTitle.textContent = post.title;
        container.appendChild(postTitle);
        container.appendChild(div);
        text.textContent = post.text;
        div.appendChild(text);
        container.appendChild(div);
        auther.textContent = '投稿者: ' + post.auther;
        div.appendChild(auther);
        like.value = i;
        like.href = '#';
        like.id = 'like' + i;
        like.style.textDecoration = 'none';
        like.style.display = 'inline-block';
        div.appendChild(like);
        likeCount.textContent = post.likeCount;
        likeCount.style.display = 'inline-block';
        likeCount.id = 'count' + i;
        div.appendChild(likeCount);
        heart.id = 'heart' + i;
        like.appendChild(heart);
        if (post.userLike) {
          heart.className = checkedHeart;
          like.addEventListener('click', likeCheckDelete);
        } else {
          heart.className = emptyHeart;
          like.addEventListener('click', likeCheck);
        }

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
        i++;
      });
    }).catch(console.error);
});
function likeCheck() {
  const num = this.value;
  const heart = document.getElementById('heart' + num);
  const postId = posts[num].id;
  const count = document.getElementById('count' + num);
  const postIdObj = { postId };
  const method = 'POST';
  const body = Object.keys(postIdObj).map((key) => key + '=' + encodeURIComponent(postIdObj[key])).join('&');
  this.removeEventListener('click', likeCheck);
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  };
  heart.className = checkedHeart;
  count.textContent++;
  fetch("/index/likecheck", { method, headers, body })
    .then(res => {
      this.addEventListener('click', likeCheckDelete);
    }).catch(console.error);
}
function likeCheckDelete() {
  const num = this.value;
  const heart = document.getElementById('heart' + num);
  const postId = posts[num].id;
  const count = document.getElementById('count' + num);
  const postIdObj = { postId };
  const method = 'POST';
  const body = Object.keys(postIdObj).map((key) => key + '=' + encodeURIComponent(postIdObj[key])).join('&');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  };
  heart.className = emptyHeart;
  this.removeEventListener('click', likeCheckDelete);
  count.textContent--;
  fetch('/index/deletelike', { method, headers, body })
    .then(res => {
      this.addEventListener('click', likeCheck);
    }).catch(console.error);
}