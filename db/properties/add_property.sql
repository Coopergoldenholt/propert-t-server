insert into properties (company_id, managed_company_id, name)
values($1, $2, $3)
returning *;
