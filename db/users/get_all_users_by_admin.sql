select u.email, u.name, u.company_id, mc.company_name as managed_company_name, u.id
from users u 
join managed_companies mc on mc.id = u.managed_company_id
where u.company_id = $1 and u.type_of_user = 'user';