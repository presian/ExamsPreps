SELECT 
	a.Id,
	a.Title,
	a.Date,
	s.Status
FROM Ads a
JOIN AdStatuses s
ON a.StatusId = s.Id
WHERE s.Status <> 'Published'
AND DATEPART(YEAR, a.Date) = DATEPART(YEAR, (SELECT MIN(Date) FROM Ads))
AND DATEPART(MONTH, a.Date) = DATEPART(MONTH, (SELECT MIN(Date) FROM Ads))
ORDER BY a.Id