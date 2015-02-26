SELECT 
	c.Name,
	q.Title,
	q.CreatedOn
from Categories c
LEFT OUTER JOIN Questions q
ON q.CategoryId = c.Id
ORDER BY c.Name
