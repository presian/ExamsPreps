USE Forum
SELECT
	u.Id,
	u.Username,
	u.FirstName,
	u.PhoneNumber,
	u.RegistrationDate,
	u.Email
FROM Users u
WHERE u.PhoneNumber IS NULL
AND u.Id NOT IN (SELECT
	UserId
FROM Questions)
ORDER BY u.RegistrationDate

--SELECT *
--FROM Users

--SELECT *
--FROM Questions