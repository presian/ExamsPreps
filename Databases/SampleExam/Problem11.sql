SELECT
	s.Status,
	COUNT(a.Id) AS [Count]
FROM Ads a
JOIN AdStatuses s
	ON a.StatusId = s.Id
GROUP BY s.Status
ORDER BY s.Status