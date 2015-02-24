USE Ads
---------
--17.1
---------
GO
CREATE VIEW AllAds AS
SELECT
	a.Id AS Id,
	a.Title AS Title,
	u.UserName AS Author,
	a.[Date] AS [Date],
	a.TownId AS [Town],
	c.Name AS [Category],
	s.[Status] AS [Status]
FROM Ads a
LEFT JOIN AspNetUsers u
	ON a.OwnerId = u.Id
LEFT JOIN Towns t
	ON a.TownId = t.Id
LEFT JOIN Categories c
	ON a.CategoryId = c.Id
LEFT JOIN AdStatuses s
	ON a.StatusId = s.Id


---------
--17.2
---------
GO
CREATE FUNCTION fn_ListUsersAds()
RETURNS @v TABLE (UserName nvarchar(100), AdDates nvarchar(max))
AS
begin
declare userCursor  cursor read_only for SELECT
	u.UserName
FROM AspNetUsers u
ORDER BY u.UserName DESC
OPEN userCursor
DECLARE @user NVARCHAR(MAX)
FETCH NEXT FROM userCursor INTO @user
WHILE @@fetch_status = 0 BEGIN
DECLARE @dates NVARCHAR(MAX) = NULL
SELECT
	@dates = COALESCE(@dates + '; ' + REPLACE(CONVERT(NVARCHAR(10), A.[Date], 20), '-', ''), REPLACE(CONVERT(NVARCHAR(10), A.[Date], 20), '-', ''))
FROM (SELECT
	a.[Date]
FROM [AllAds] a
WHERE a.Author = @user) A
ORDER BY A.Date
INSERT INTO @v
	VALUES (@user, @dates)
FETCH NEXT FROM userCursor INTO @user
END
RETURN
END
GO

SELECT
	*
FROM fn_ListUsersAds()



--Magic--
--declare @result nvarchar(1000)
--select @result = COALESCE(@result+'; '+ REPLACE(convert(nvarchar(10), A.[Date], 20),'-',''), REPLACE(convert(nvarchar(10), A.[Date], 20),'-',''))
--                FROM (  select  a.[Date] from [Ads] a JOIN AspNetUsers u ON u.Id = a.OwnerId  WHERE u.UserName = 'didi') A
--select @result