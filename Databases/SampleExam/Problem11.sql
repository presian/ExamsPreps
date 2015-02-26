SELECT
	s.[Status],
	COUNT(a.Id) AS [Count]
FROM Ads a
JOIN AdStatuses s
	ON s.Id = a.StatusId
GROUP BY s.[Status]
ORDER BY s.[Status]