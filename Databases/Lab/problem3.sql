USE Forum
SELECT
	Username,
	LastName,
	CASE
		WHEN (PhoneNumber IS NULL) THEN 0
		ELSE 1
		END AS [Has Phone]
FROM Users
ORDER BY LastName