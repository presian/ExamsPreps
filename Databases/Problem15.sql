SELECT
	a1.Date AS FirstDate,
	a2.Date AS SecondDate
FROM	Ads a1,
		Ads a2
WHERE a2.Date > a1.Date
AND DATEDIFF(SECOND, a1.Date, a2.Date) < 12 * 60 * 60
ORDER BY a1.Date, a2.Date