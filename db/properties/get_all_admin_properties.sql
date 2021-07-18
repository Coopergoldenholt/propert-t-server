select p.id as property_id, p.company_id, p.managed_company_id, p.name, mc.company_name  from properties p
join managed_companies mc on mc.id = p.managed_company_id
where p.company_id = $1
order by mc.company_name;
