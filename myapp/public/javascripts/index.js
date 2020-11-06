const url = 'http://localhost:3000/test/post';
const index = document.getElementById("index");
const edit = '/edit';
const truncate = '/edit/delete';
console.log('start');
window.addEventListener('load', function () {
  console.log('event start')
  fetch(url)
    .then(res => res.json())
    .then(body => {
      let posts = body;
      console.log(index);
      console.log(posts);
      //otherpostsを個数分作成
      posts[0].otherposts.forEach(post => {
        //要素の定義
        let div = document.createElement('div');
        let container = document.createElement('div');
        let text = document.createElement('p');
        let auther = document.createElement('p');
        let posttitle = document.createElement('h3');
        let input = document.createElement('input');
        let updateform = document.createElement('form');
        let deleteform = document.createElement('form');
        //作成開始
        container.classList.add('container');
        index.appendChild(container);
        posttitle.textContent = post.title;
        container.appendChild(posttitle);
        container.appendChild(div);
        text.textContent = post.text;
        div.appendChild(text);
        container.appendChild(div);
        auther.textContent = '投稿者: ' + post.auther;
        div.appendChild(auther);
      });
      //myposts
      posts[0].myposts.forEach(post => {
        //要素の定義
        let div = document.createElement('div');
        let container = document.createElement('div');
        let text = document.createElement('p');
        let auther = document.createElement('p');
        let posttitle = document.createElement('h3');
        let hiddenupdate = document.createElement('input');
        let hiddendelete = document.createElement('input');
        let updateinput = document.createElement('input');
        let deleteinput = document.createElement('input');
        let updateform = document.createElement('form');
        let deleteform = document.createElement('form');
        //作成開始
        container.classList.add('container');
        index.appendChild(container);
        posttitle.textContent = post.title;
        container.appendChild(posttitle);
        container.appendChild(div);
        text.textContent = post.text;
        div.appendChild(text);
        auther.textContent = '投稿者: ' + post.auther;
        div.appendChild(auther);
        updateform.action = edit;
        updateform.method = 'GET';
        updateform.style.display = 'inline-block';
        container.appendChild(updateform);
        hiddenupdate.type = 'hidden';
        hiddenupdate.name = 'id';
        hiddenupdate.value = post.id;
        updateinput.type = 'submit';
        updateinput.value = '更新';
        updateform.appendChild(hiddenupdate);
        updateform.appendChild(updateinput);
        deleteform.action = truncate;
        deleteform.method = 'POST';
        deleteform.style.display = 'inline-block';
        container.appendChild(deleteform);
        hiddendelete.type = 'hidden';
        hiddendelete.name = 'id';
        hiddendelete.value = post.id;
        deleteinput.type = 'submit';
        deleteinput.value = '削除';
        deleteform.appendChild(hiddendelete);
        deleteform.appendChild(deleteinput);
      });

    });
});
