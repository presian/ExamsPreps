--1--
GO
CREATE TABLE Countries(
Id int primary key identity,
Name nvarchar(max)
)

GO
alter table Towns
add CountryId int foreign key references Countries(Id)

--2--
GO
INSERT INTO Countries (Name)
	VALUES ('Bulgaria'), ('Germany'), ('France')
UPDATE Towns
SET CountryId = (SELECT
	Id
FROM Countries
WHERE Name = 'Bulgaria')
INSERT INTO Towns
	VALUES ('Munich', (SELECT
		Id
	FROM Countries
	WHERE Name = 'Germany')),
	('Frankfurt', (SELECT
		Id
	FROM Countries
	WHERE Name = 'Germany')),
	('Berlin', (SELECT
		Id
	FROM Countries
	WHERE Name = 'Germany')),
	('Hamburg', (SELECT
		Id
	FROM Countries
	WHERE Name = 'Germany')),
	('Paris', (SELECT
		Id
	FROM Countries
	WHERE Name = 'France')),
	('Lyon', (SELECT
		Id
	FROM Countries
	WHERE Name = 'France')),
	('Nantes', (SELECT
		Id
	FROM Countries
	WHERE Name = 'France'))


--3--
GO
UPDATE Ads
SET TownId = (SELECT
	t.Id
FROM Towns t
WHERE t.Name = 'Paris')
WHERE DATENAME(WEEKDAY, Date) = 'Friday'

--4--
GO
UPDATE Ads
SET TownId = (SELECT
	t.Id
FROM Towns t
WHERE t.Name = 'Hamburg')
WHERE DATENAME(WEEKDAY, Date) = 'Thursday'

--5--
GO
DELETE Ads
WHERE OwnerId IN (SELECT
		u.Id
	FROM AspNetUsers u
	LEFT JOIN AspNetUserRoles ur
		ON u.Id = ur.UserId
	LEFT JOIN AspNetRoles r
		ON ur.RoleId = r.Id
	WHERE r.Name = 'Partner')

--6--
INSERT INTO Ads (Title, Text, ImageDataURL, OwnerId, CategoryId, TownId, Date, StatusId)
	VALUES ('Free Book', 'Free C# Book', NULL, (SELECT
		u.Id
	FROM AspNetUsers u
	WHERE u.UserName = 'nakov')
	, NULL, NULL, GETDATE(), (SELECT
		s.Id
	FROM AdStatuses s
	WHERE s.Status = 'Waiting Approval'))

--7--
SELECT
	t.Name AS Town,
	c.Name AS Country,
	COUNT(a.Id) AS AdsCount
FROM Ads a
FULL JOIN Towns t
	ON a.TownId = t.Id
full JOIN Countries c
	ON t.CountryId = c.Id
GROUP BY t.Name, c.Name
ORDER BY t.Name, c.Name
