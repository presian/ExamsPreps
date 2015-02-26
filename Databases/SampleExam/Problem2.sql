SELECT
	[Title],
	[Date]
FROM [Ads].[dbo].[Ads]
WHERE [Date] <= CONVERT(DATETIME, '2015-01-01 23:59:59', 120)
AND [Date] >= CONVERT(DATETIME, '2014-12-26 00:00:00', 120)
ORDER BY [Date]