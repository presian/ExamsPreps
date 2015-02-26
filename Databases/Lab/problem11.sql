USE Forum
--SELECT 
--	c.Name AS Category,
--	COUNT(a.Id) AS [Answers Count]
--FROM Answers a
--JOIN Questions q
--ON a.QuestionId = q.Id
--JOIN Categories c
--ON q.CategoryId = c.Id
--GROUP BY c.Name
--ORDER BY [Answers Count]

SELECT 
	c.Name AS Category,
	COUNT(a.Id) AS [Answers Count]
FROM Categories c
LEFT JOIN Questions q
ON c.Id = q.CategoryId
LEFT JOIN Answers a
ON q.Id = a.QuestionId
GROUP BY c.Name
ORDER BY [Answers Count] DESC