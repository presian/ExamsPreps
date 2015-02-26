SELECT
  u.UserName,
  COUNT(a.Id) as AdsCount,
  CASE MIN(r.Name)
	WHEN 'Administrator' THEN 'yes'
	ELSE 'no'
  END as IsAdministrator
FROM
  AspNetUsers u
  LEFT JOIN Ads a ON a.OwnerId = u.Id
  LEFT JOIN AspNetUserRoles ur ON ur.UserId = u.Id
  LEFT JOIN AspNetRoles r ON (ur.RoleId = r.Id AND r.Name='Administrator')
GROUP BY u.UserName
ORDER BY u.UserName