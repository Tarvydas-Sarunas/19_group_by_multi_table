'use strict';
console.log('front.js file was loaded');

const allPostUrl = 'http://localhost:3000/api/posts/';
// parsisiusti visus postus

const postsList = document.getElementById('posts-list');

(async () => {
  const [postArr, error] = await getDataFetch(allPostUrl);
  console.log('error ===', error);
  console.log('postArr ===', postArr);

  const elsArr = postArr.map(makeSinglePost);
  console.log('elsArr ===', elsArr);
  postsList.append(...elsArr);
})();

// sugeneruoti postus html
function makeSinglePost(pObj) {
  const liEl = document.createElement('li');
  liEl.className = 'col-md-6 col-lg-4';
  liEl.innerHTML = `
  <div class="card mb-3">
  <div class="card-body">
    <h5 class="card-title">${pObj.title}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${pObj.date.split('T')[0]} </h6>
    <p class="card-text">${pObj.author}</p>
    <a href="single_post.html?postId=${
      pObj.post_id
    }" class="btn btn-primary">Read more</a>
  </div>
  <div class="card-footer">
    <p class="lead mb-0">Comments: 6</p>
  </div>
</div>
`;
  return liEl;
}

//  hellper fetch function
async function getDataFetch(url) {
  try {
    const resp = await fetch(url);
    if (resp.ok === false) {
      throw {
        status: resp.status,
        msg: resp.statusText,
      };
    }
    const data = await resp.json();
    return [data, null];
  } catch (error) {
    console.log('error getDataFetch ===', error);
    return [null, error];
  }
}
