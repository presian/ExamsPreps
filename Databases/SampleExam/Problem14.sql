SELECT
	COUNT(a.Id) AS [AdsCount],
	ISNULL(t.Name, '(no town)') AS [Town]
FROM Ads a
LEFT JOIN Towns t
	ON a.TownId = t.Id
GROUP BY t.Name
HAVING COUNT(a.id) IN (2, 3)
ORDER BY t.Name