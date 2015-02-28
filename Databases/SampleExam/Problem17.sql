--1--
CREATE VIEW AllAds AS
SELECT
	a.Id,
	a.Title,
	u.UserName AS Author,
	a.Date,
	t.Name AS Town,
	c.Name AS Category,
	s.Status
FROM Ads a
LEFT JOIN AspNetUsers u
	ON a.OwnerId = u.Id
LEFT JOIN Towns t
	ON a.TownId = t.Id
LEFT JOIN Categories c
	ON a.CategoryId = c.Id
LEFT JOIN AdStatuses s
	ON a.StatusId = s.Id

SELECT
	*
FROM AllAds

--2-- v1
GO
CREATE function fn_ListUsersAds() 
returns @t table(UserName nvarchar(max), AdDates nvarchar(max))
as
begin
	declare UserCursor Cursor read_Only for SELECT
	Id,
	UserName
FROM AspNetUsers
ORDER BY UserName DESC
OPEN UserCursor
DECLARE @user NVARCHAR(MAX) = NULL,
@userId NVARCHAR(MAX) = NULL
FETCH NEXT FROM UserCursor INTO @userId, @user
WHILE @@fetch_status = 0 BEGIN
DECLARE AdCursur CURSOR READ_ONLY FOR SELECT
	Date
FROM Ads
WHERE OwnerId = @userId
ORDER BY Date
OPEN AdCursur
DECLARE @date DATETIME = NULL,
@result NVARCHAR(MAX) = NULL
FETCH NEXT FROM AdCursur INTO @date
WHILE @@fetch_status = 0 BEGIN
IF @result IS NULL BEGIN
SET @result = REPLACE(CONVERT(NVARCHAR(10), @date, 120), '-', '')
END ELSE BEGIN
SET @result = @result + '; ' + REPLACE(CONVERT(NVARCHAR(10), @date, 120), '-', '')
END
FETCH NEXT FROM AdCursur INTO @date
END
INSERT INTO @t (UserName, AdDates)
	VALUES (@user, @result)
CLOSE AdCursur
DEALLOCATE AdCursur
FETCH NEXT FROM UserCursor INTO @userId, @user
END
CLOSE UserCursor
DEALLOCATE UserCursor
RETURN
END

SELECT
	*
FROM fn_ListUsersAds()

--2--v2
GO
CREATE FUNCTION fn_ListUsersAds2()
RETURNS @t TABLE (UserName NVARCHAR(MAX), AdDates NVARCHAR(MAX))
AS
BEGIN
	declare UserCursor cursor read_only for SELECT
	UserName
FROM AspNetUsers
ORDER BY UserName DESC
OPEN UserCursor
DECLARE @user NVARCHAR(MAX) = NULL
FETCH NEXT FROM UserCursor INTO @user
WHILE @@fetch_status = 0 BEGIN
DECLARE @dates NVARCHAR(MAX) = NULL
SELECT
	@dates =
			CASE
				WHEN @dates IS NULL THEN REPLACE(CONVERT(NVARCHAR(10), [Date], 120), '-', '')
				ELSE @dates + '; ' + REPLACE(CONVERT(NVARCHAR(10), [Date], 120), '-', '')
			END
FROM AllAds
WHERE Author = @user
ORDER BY [Date]
INSERT INTO @t
VALUES(@user, @dates)
FETCH NEXT FROM UserCursor INTO @user
END
CLOSE UserCursor
DEALLOCATE UserCursor
RETURN
END
select * FROM fn_ListUsersAds2()