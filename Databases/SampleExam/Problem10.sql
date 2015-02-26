SELECT
	a.Id,
	a.Title,
	a.[Date],
	s.[Status]
FROM Ads a
JOIN AdStatuses s
	ON s.Id = a.StatusId
WHERE DATEPART(year, a.[Date]) = DATEPART(YEAR, (SELECT MIN([Date]) FROM Ads))
AND DATEPART(MONTH, a.[Date]) = DATEPART(MONTH, (SELECT MIN([Date]) FROM Ads))
AND s.[Status] <> 'Published'
ORDER BY a.Id