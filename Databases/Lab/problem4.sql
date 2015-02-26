USE Forum
SELECT
	q.Title AS [Question Title],
	u.Username [Author]
FROM Questions q
JOIN Users u
	ON q.UserId = u.Id
ORDER BY q.Id