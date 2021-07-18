insert into posts (company_id, property_id, date, user_id, summary, title, managed_company_id)
values($1, $2, $3, $4, $5, $6, $7)
returning *;