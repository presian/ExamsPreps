--------
--13.1--
--------
USE Forum
CREATE TABLE Towns(
Id INT PRIMARY KEY IDENTITY NOT NULL,
Name NVARCHAR(MAX)
)

ALTER TABLE Users
ADD TownId INT FOREIGN KEY REFERENCES Towns(Id)


--------
--13.2--
--------
USE Forum
INSERT INTO Towns (Name)
	VALUES ('Sofia'), ('Berlin'), ('Lyon')
UPDATE Users
SET TownId = (SELECT
	Id
FROM Towns
WHERE Name = 'Sofia')
INSERT INTO Towns
	VALUES ('Munich'), ('Frankfurt'), ('Varna'), ('Hamburg'), ('Paris'), ('Lom'), ('Nantes')


--------
--13.3--
--------
USE Forum
UPDATE Users
SET TownId = (SELECT
	t.Id
FROM Towns t
WHERE t.Name = 'Paris')
WHERE DATENAME(WEEKDAY, RegistrationDate) = 'Friday'

--------
--13.4--
--------
USE Forum
UPDATE Answers
SET QuestionId = (SELECT
	q.Id
FROM Questions q
WHERE q.Title = 'Java += operator')
WHERE DATENAME(WEEKDAY, CreatedOn) IN ('Monday', 'Sunday')
AND DATENAME(MONTH, CreatedOn) = 'February'

--------
--13.5--
--------
USE Forum
ALTER table Votes
DROP constraint FK_Votes_Answers
alter table Votes
add constraint FK_Votes_Answers 
foreign key (AnswerId) references Answers(Id) on delete cascade
DELETE Answers
WHERE Id IN (SELECT
		AnswerId
	FROM Votes
	GROUP BY AnswerId
	HAVING SUM(Value) < 0)


--------
--13.6--
--------
USE Forum

INSERT INTO Questions (Title, Content, CategoryId, UserId, CreatedOn)
	VALUES ('Fetch NULL values in PDO query', 'When I run the snippet, NULL values are converted to empty strings. How can fetch NULL values?', (SELECT
		c.Id
	FROM Categories c
	WHERE c.Name = 'Databases')
	, (SELECT
		u.Id
	FROM Users u
	WHERE u.Username = 'darkcat')
	, GETDATE())

--------
--13.7--
--------
USE Forum
SELECT
	t.Name AS Town,
	u.Username AS Username,
	COUNT(a.Id) AS AnswersCount
FROM Towns t
FULL OUTER JOIN Users u
	ON t.Id = u.TownId
FULL OUTER JOIN Answers a
	ON u.Id = a.UserId
GROUP BY	t.Name,
			u.Username			
ORDER BY AnswersCount DESC, u.Username


