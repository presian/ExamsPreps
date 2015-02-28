SELECT
	a.Title,
	c.Name AS CategoryName,
	t.Name AS TownName,
	s.[Status]
FROM Ads a
LEFT JOIN Categories c
	ON a.CategoryId = c.Id
LEFT JOIN Towns t
	ON a.TownId = t.Id
JOIN AdStatuses s
	ON a.StatusId = s.Id
WHERE a.StatusId = (SELECT
	Id
FROM AdStatuses
WHERE Status = 'Published')
AND t.Name IN ('Sofia', 'Blagoevgrad', 'Stara Zagora')
ORDER BY a.Title