SELECT
	a.Title,
	c.Name AS [CategoryName],
	t.Name AS [TownName],
	s.[Status] AS [Status]
FROM Ads a
JOIN Categories c
	ON a.CategoryId = c.Id
JOIN Towns t
	ON a.TownId = t.Id
JOIN AdStatuses s
	ON a.StatusId = s.Id
WHERE t.Name IN ('Blagoevgrad', 'Stara Zagora', 'Sofia')
AND s.[Status] = 'Published'
ORDER BY a.Title