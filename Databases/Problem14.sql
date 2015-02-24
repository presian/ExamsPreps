SELECT
	COUNT(*) AS [AdsCount],
	ISNULL(t.Name, '(no town)') AS [Town]
FROM Ads a
LEFT JOIN Towns t
	ON a.TownId = t.Id
GROUP BY t.Name
HAVING COUNT(*) IN (2, 3)