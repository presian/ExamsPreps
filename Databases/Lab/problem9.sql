USE Forum
SELECT  TOP 10
	a.Content,
	a.CreatedOn,
	u.Username AS Author
FROM Answers a
JOIN Users u
	ON a.UserId = u.Id
ORDER BY a.CreatedOn