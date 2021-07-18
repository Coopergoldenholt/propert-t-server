insert into managed_companies (managing_company_id,  name)
values($1, $2)

returning *;