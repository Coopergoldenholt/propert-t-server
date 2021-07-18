SELECT 
u.email, u.id as user_id, u.first_name, u.last_name, u.type_of_user, u.company_id, u.managed_company as managing_company_id, mc.name as managing_company_name
FROM users u
LEFT JOIN managed_companies mc ON mc.id = u.managed_company
WHERE u.company_id = 1;