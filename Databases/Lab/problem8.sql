USE Forum
SELECT
	MIN(a.CreatedOn) AS MinDate,
	MAX(a.CreatedOn) AS MaxDate
FROM Answers a
WHERE a.CreatedOn >= CONVERT(DATETIME, '01.01.2012', 104)
AND a.CreatedOn < CONVERT(DATETIME, '01.01.2015', 104)