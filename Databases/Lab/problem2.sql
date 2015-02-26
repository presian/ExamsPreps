USE Forum
SELECT
	Content,
	CreatedOn
FROM Answers
WHERE CreatedOn < CONVERT(DATETIME, '22.03.2013', 104)
AND CreatedOn >= CONVERT(DATETIME, '15.06.2012', 104)
ORDER BY CreatedOn