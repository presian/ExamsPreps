SELECT
	[Title],
	[Date],
	CASE 
		WHEN ([ImageDataURL] IS NULL) THEN 'yes'
		WHEN ([ImageDataURL] IS NOT NULL) THEN 'no'
	END AS [Has Image]
FROM Ads
ORDER BY Id