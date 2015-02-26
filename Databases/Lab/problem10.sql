USE Forum

DECLARE @maxdate datetime
set @maxdate = (SELECT max(CreatedOn) FROM Answers WHERE IsHidden = 1)
DECLARE @mindate datetime
set @mindate = (SELECT MIN(CreatedOn) FROM Answers WHERE IsHidden = 1 AND DATEPART (YEAR, CreatedOn) = DATEPART(YEAR, @maxdate))

SELECT
	a.Content AS [Answer Content],
	q.Title AS [Question],
	c.Name AS [Category]
FROM Answers a
JOIN Questions q
	ON a.QuestionId = q.Id
JOIN Categories c
	ON q.CategoryId = c.Id
WHERE a.IsHidden = 1
AND datepart(YEAR,a.CreatedOn) = DATEPART(YEAR, @maxdate)
AND (datepart(MONTH,a.CreatedOn) = DATEPART(MONTH, @maxdate)OR datepart(MONTH,a.CreatedOn) = DATEPART(MONTH, @mindate))
ORDER BY c.Name