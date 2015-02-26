USE Forum
SELECT 
	c.Name AS Category,
	u.Username,
	u.PhoneNumber,
	COUNT(*) AS [Answers Count]	
FROM Users u
JOIN Answers a
ON u.Id = a.UserId
JOIN Questions q
ON a.QuestionId = q.Id
JOIN Categories c
ON q.CategoryId = c.Id
GROUP BY c.Name, u.Username, u.PhoneNumber
HAVING u.PhoneNumber IS NOT NULL
ORDER BY [Answers Count] DESC