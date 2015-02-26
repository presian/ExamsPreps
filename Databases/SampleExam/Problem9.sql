SELECT TOP 10
	a.Title,
	a.[Date],
	s.[Status]
FROM Ads a
JOIN AdStatuses s
	ON a.StatusId = s.Id
ORDER BY a.[Date] DESC