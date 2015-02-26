--------
--14.1--
--------
USE Forum
GO
CREATE VIEW AllQuestions as
SELECT
	u.Id AS [UId],
	u.Username,
	u.FirstName,
	u.LastName,
	u.Email,
	u.PhoneNumber,
	u.RegistrationDate,
	q.Id AS [QId],
	q.Title,
	q.Content,
	q.CategoryId,
	q.UserId,
	q.CreatedOn
FROM Questions q
RIGHT OUTER JOIN Users u
	ON q.UserId = u.Id

SELECT
	*
FROM AllQuestions

--------
--14.2--
--------
USE Forum
GO
CREATE FUNCTION fn_ListUsersQuestions()
returns @t table(UserName NVARCHAR(max), Questions nvarchar(max))
as
begin
declare  UserCursur  cursor read_only for SELECT
DISTINCT
	Username
FROM AllQuestions
ORDER BY Username
OPEN UserCursur
DECLARE @user NVARCHAR(MAX)
FETCH NEXT FROM UserCursur INTO @user
WHILE @@fetch_status = 0 BEGIN
DECLARE @result NVARCHAR(MAX) = NULL
SELECT
	@result = COALESCE(@result + ', ' + A.Title, A.Title)
FROM (SELECT
	a.Title
FROM AllQuestions a
WHERE a.Username = @user) A
ORDER BY A.Title DESC
INSERT INTO @t (UserName, Questions)
	VALUES (@user, @result)
FETCH NEXT FROM UserCursur INTO @user
END
DEALLOCATE UserCursur
RETURN
END

SELECT
	*
FROM fn_ListUsersQuestions()

--Magic--
--declare @result nvarchar(max)
--select @result = COALESCE(@result+'; '+ REPLACE(convert(nvarchar(10), A.[Date], 20),'-',''), REPLACE(convert(nvarchar(10), A.[Date], 20),'-',''))
--                FROM (  select  a.[Date] from [Ads] a JOIN AspNetUsers u ON u.Id = a.OwnerId  WHERE u.UserName = 'didi') A
--select @result