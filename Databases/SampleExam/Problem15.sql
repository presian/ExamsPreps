SELECT
	a.Date AS [FirstDate],
	b.Date as [SecondDate]
FROM	Ads a
JOIN Ads b
ON a.Date < b.Date
WHERE DATEDIFF(HOUR, a.Date, b.Date) < 12
ORDER BY FirstDate, SecondDate