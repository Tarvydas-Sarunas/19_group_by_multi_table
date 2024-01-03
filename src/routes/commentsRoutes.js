const express = require('express');
const { dbQueryWithData } = require('../helper');
const commentsRoutes = express.Router();

//  get /api/comments/post/1 - grazina visus komentarus kurie yra parasyti po postu kurio id yra 1
commentsRoutes.get('/post/:id', async (req, res) => {
  const postId = +req.params.id;
  const sql = 'SELECT * FROM `post_comments` WHERE post_id=?;';
  const [rows, error] = await dbQueryWithData(sql, [postId]);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.json(rows);
});

// post /api/comments/post/1 - sukurs nauja commentara po pirmu postu
commentsRoutes.post('/post/:id', async (req, res) => {
  const sql = `INSERT INTO post_comments (content, post_id, author) VALUES (?, ?, ?);`;
  const { content, post_id: postId, author } = req.body;
  const argArr = [content, postId, author];
  const [rezObj, error] = await dbQueryWithData(sql, argArr);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  if (rezObj.affectedRows === 1) {
    res.status(200).json({ msg: 'Your comment was added' });
  } else {
    res.status(400).json({ msg: 'Something went wrong' });
  }
});

//  get /api/comments/1 - grazina visus komentarus
commentsRoutes.get('/', async (req, res) => {
  const sql = 'SELECT * FROM `post_comments` WHERE 1';
  const [rows, error] = await dbQueryWithData(sql);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.json(rows);
});

// iseksportuoju
module.exports = commentsRoutes;
