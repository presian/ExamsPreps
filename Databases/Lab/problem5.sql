USE Forum
SELECT 
	a.Content AS [Answer Content],
	a.CreatedOn AS [CreatedOn],
	u.Username AS[Answer Author],
	q.Title AS [Question Title],
	c.Name AS [Category Name]
FROM Answers a
JOIN Questions q
ON a.QuestionId = q.Id
JOIN Categories c
on q.CategoryId = c.Id
JOIN Users u
ON a.UserId = u.Id
ORDER BY c.Name, a.QuestionId