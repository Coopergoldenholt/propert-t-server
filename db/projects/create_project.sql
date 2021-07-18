INSERT INTO projects (company_id, managed_company_id, name, completed, property_id, date)
VALUES ($1, $2, $3, false, $4, $5)

returning *;