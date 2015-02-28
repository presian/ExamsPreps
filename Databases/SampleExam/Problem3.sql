SELECT
	a.Title,
	a.[Date],
	CASE
		WHEN a.ImageDataURL IS NULL THEN 'no'
		ELSE 'yes'
	END AS [Has Image]
FROM Ads a
ORDER BY a.Id