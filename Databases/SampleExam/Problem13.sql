SELECT 
	u.UserName,
	COUNT(a.Id) AS [AdsCount],
	CASE
		WHEN admins.UserName IS NULL THEN 'no'
		ELSE 'yes'
	END AS [IsAdministrator]
FROM AspNetUsers u
LEFT JOIN Ads a
ON u.Id = a.OwnerId
LEFT JOIN (SELECT DISTINCT
	u.UserName
FROM AspNetUsers u
left JOIN AspNetUserRoles ur
	ON u.Id = ur.UserId
left JOIN AspNetRoles r
	ON ur.RoleId = r.Id
WHERE r.Name = 'Administrator') as admins 
ON u.UserName = admins.UserName 
GROUP BY u.UserName, admins.UserName
ORDER BY u.UserName
