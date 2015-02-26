SELECT
	a.Title,
	c.Name AS [CategoryName],
	t.Name AS [TownName],
	s.[Status] AS [Status] 
FROM Ads a
LEFT JOIN Categories c
	ON a.CategoryId = c.Id
LEFT JOIN Towns t
	ON a.TownId = t.Id
LEFT JOIN AdStatuses s
	ON a.StatusId = s.Id