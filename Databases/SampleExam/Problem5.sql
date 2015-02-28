SELECT 
	a.Title,
	t.Name AS Town
FROM Ads a
left JOIN Towns t
ON a.TownId = t.Id
ORDER BY a.Id