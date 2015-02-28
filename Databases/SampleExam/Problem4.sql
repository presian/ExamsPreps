SELECT *
FROM Ads a
WHERE a.ImageDataURL IS NULL
OR a.CategoryId IS NULL
OR a.TownId IS NULL
ORDER BY a.Id