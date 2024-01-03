const express = require('express');
const { dbQueryWithData } = require('../helper');
const postsRouter = express.Router();

// get /api/posts/1 - grazins viena posta
postsRouter.get('/:id', async (req, res) => {
  const sql = 'SELECT * FROM `posts` WHERE post_id=?;';
  const id = +req.params.id;
  const [rows, error] = await dbQueryWithData(sql, [id]);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  if (rows.length === 1) {
    res.json(rows[0]);
    return;
  }
  if (rows.length === 0) {
    res.status(400).json({ msg: 'This id not exist' });
    return;
  }
  res.json(rows);
});

// get /api/posts - grazins visus postus
postsRouter.get('/', async (req, res) => {
  // const sql = 'SELECT * FROM `posts`';
  const sql = `SELECT posts.post_id, posts.title, posts.author, posts.date, posts.body, COUNT(post_comments.comm_id) AS comment_count
  FROM posts
  LEFT JOIN post_comments
  ON posts.post_id=post_comments.post_id
  GROUP BY posts.title
  ORDER BY posts.post_id`;
  const [rows, error] = await dbQueryWithData(sql);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.json(rows);
});

// is exportuoju
module.exports = postsRouter;
