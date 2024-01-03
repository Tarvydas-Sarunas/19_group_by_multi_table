'use strict';
console.log('front.js file was loaded');

const postId = 5;
const postUrl = 'http://localhost:3000/api/posts';
const onePosteCommentUrl = 'http://localhost:3000/api/comments/post';

const els = {
  title: document.getElementById('title'),
  author: document.getElementById('author'),
  date: document.getElementById('date'),
  content: document.getElementById('content'),
  commentsListBlock: document.getElementById('comments-list-block'),
  commentsListEl: document.getElementById('comments-list-el'),
};

// parsisiusti posta kurio id yra post id
(async () => {
  const [currentPostObj, error] = await getDataFetch(`${postUrl}/${postId}`);
  console.log('error ===', error);

  console.log('currentPostObj ===', currentPostObj);

  // surasyti reiksmes
  fillPostDataHtml(currentPostObj);

  // parsiusti komentarus skirtus tam postui
  const [commentsObj, commentError] = await getDataFetch(
    `${onePosteCommentUrl}/${postId}`
  );

  console.log('commentError ===', commentError);

  console.log('commentsObj ===', commentsObj);
  // jei yra komentaru tada rodyti comentaru bloka
  if (commentsObj.length > 0) {
    // pridedu klase
    els.commentsListBlock.classList.add('d-block');
    // nuemu klase
    els.commentsListBlock.classList.remove('d-none');
  }
  // komentaru bloke sugeneruoti komentarus
  runderComments(commentsObj);
})();

// supildyti html reiksmes su post informacija
function fillPostDataHtml(postObj) {
  els.title.textContent = postObj.title;
  els.author.textContent = postObj.author;
  const formatedDate = new Date(postObj.date).toLocaleDateString('fr-FR', {
    dateStyle: 'long',
  });
  els.date.textContent = formatedDate;
  els.content.textContent = postObj.body;
}

function runderComments(comentaruObj) {
  els.commentsListEl.innerHTML = '';
  comentaruObj.forEach((comObj) => {
    const liEl = document.createElement('li');
    liEl.classList.add('col-md-6');
    // <!-- single comment -->
    const divEl = document.createElement('div');
    divEl.classList.add('card', 'mb-3');
    const bodyDivEl = document.createElement('div');
    bodyDivEl.classList.add('card-body');
    const h5El = document.createElement('h5');
    h5El.classList.add('card-title');
    h5El.textContent = comObj.author;
    const h6El = document.createElement('h6');
    h6El.classList.add('card-subtitle', 'mb-2', 'text-muted');
    h6El.textContent = comObj.created_at;
    const pEl = document.createElement('p');
    pEl.classList.add('card-text');
    pEl.textContent = comObj.body;
    bodyDivEl.append(h5El, h6El, pEl);
    divEl.append(bodyDivEl);
    liEl.append(divEl);
    // <!-- /single comment -->
    els.commentsListEl.append(liEl);
  });
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
