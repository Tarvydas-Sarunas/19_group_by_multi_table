-- prideti post title prie comm lenteles
SELECT COUNT(post_comments.post_id), posts.title 
FROM post_comments 
JOIN posts 
ON posts.post_id=post_comments.post_id
GROUP BY post_comments.post_id

-- posts with comment count

SELECT posts.post_id, posts.title, posts.author, posts.date, posts.body, COUNT(post_comments.comm_id) AS comment_count
FROM posts
LEFT JOIN post_comments
ON posts.post_id=post_comments.post_id
GROUP BY posts.title