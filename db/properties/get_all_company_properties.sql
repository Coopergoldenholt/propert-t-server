SELECT mc.id AS managed_company_id, p.name AS property_name, mc.name AS managed_company_name, p.id AS property_id, p.company_id FROM properties p 
JOIN managed_companies mc ON mc.id = p.managed_company_id
WHERE mc.managing_company_id = $1;