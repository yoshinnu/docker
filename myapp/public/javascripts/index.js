const url = 'http://localhost:3000/test/post';
const index = document.getElementById("index");
const edit = '/edit';
const truncate = '/edit/delete';

//画面に表示させる記事作成
window.addEventListener('load', function () {
  fetch(url)
    .then(res => res.json())
    .then(body => {
      let posts = body;
      posts.postData.forEach(post => {
        //要素の定義
        let div = document.createElement('div');
        let container = document.createElement('div');
        let text = document.createElement('p');
        let auther = document.createElement('p');
        let postTitle = document.createElement('h3');
        let hiddenUpdate = document.createElement('input');
        let hiddenDelete = document.createElement('input');
        let updateInput = document.createElement('input');
        let deleteInput = document.createElement('input');
        let updateForm = document.createElement('form');
        let deleteForm = document.createElement('form');
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
        //userの投稿の場合更新と削除ボタンを追加
        if (post.user_id === posts.user.id) {
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