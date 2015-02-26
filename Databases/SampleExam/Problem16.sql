USE Ads

----------
---16.1
----------
GO
CREATE TABLE Countries(
Id int primary key identity not null,
Name nvarchar (100) not null
)
GO
ALTER table Towns
add CountryId int null foreign key references Countries(Id)
GO

---------
--16.2
---------
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


---------
--16.3
---------
UPDATE Ads
SET TownId = (SELECT
	t.Id
FROM Towns t
WHERE t.Name = 'Paris')
WHERE DATENAME(WEEKDAY, [Date]) = 'Friday'


---------
--16.4
---------
UPDATE Ads
SET TownId = (SELECT
	t.Id
FROM Towns t
WHERE t.Name = 'Hamburg')
WHERE DATENAME(WEEKDAY, [Date]) = 'Thursday'


--------------------------
--16.5
--------------------------
DELETE Ads
WHERE OwnerId IN (SELECT
		u.Id
	FROM AspNetUsers u
	JOIN AspNetUserRoles ur
		ON u.Id = ur.UserId
	JOIN AspNetRoles r
		ON ur.RoleId = r.Id
	WHERE r.Name = 'Partner')


-----------------------
--16.6
-----------------------
INSERT INTO Ads (Title,
[Text],
ImageDataURL,
[Date],
OwnerId,
StatusId)
	VALUES ('Free Book',
	'Free C# Book',
	NULL,
	GETDATE(), (SELECT
		Id
	FROM AspNetUsers
	WHERE UserName = 'nakov')
	, (SELECT
		Id
	FROM AdStatuses
	WHERE [Status] = 'Waiting Approval'))


-------------------
--16.7
-------------------
SELECT
	t.Name AS Town,
	c.Name AS Country,
	COUNT(a.Id) AS AdsCount
FROM Towns t
FULL OUTER JOIN Ads a
	ON a.TownId = t.Id
FULL OUTER JOIN Countries c
	ON t.CountryId = c.Id
GROUP BY	t.Name,
			c.Name
ORDER BY Town, Country