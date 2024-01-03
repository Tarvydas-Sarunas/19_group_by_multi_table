'use strict';
console.log('front.js file was loaded');

const postId = 8;
const postUrl = 'http://localhost:3000/api/posts';

const els = {
  title: document.getElementById('title'),
  author: document.getElementById('author'),
  date: document.getElementById('date'),
  content: document.getElementById('content'),
};

// parsisiusti posta kurio id yra post id
(async () => {
  const [currentPostObj, error] = await getDataFetch(`${postUrl}/${postId}`);
  console.log('error ===', error);

  console.log('currentPostObj ===', currentPostObj);
})();

// supildyti html reiksmes su post informacija

// parsiusti komentarus skirtus tam postui

// jei yra komentaru tada rodyti comentaru bloka

// komentaru bloke sugeneruoti komentarus

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
