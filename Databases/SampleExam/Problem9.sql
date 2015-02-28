SELECT top 10
	a.Title,
	a.Date,
	s.Status
FROM Ads a
JOIN AdStatuses s
on a.StatusId = s.Id
ORDER BY a.Date DESC 