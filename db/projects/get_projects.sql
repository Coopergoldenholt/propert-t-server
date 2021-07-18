select p.name, p.completed, p.property_id as property_id, p.date, up.project_id from projects p
join user_projects up on up.project_id = p.id
join users u on up.user_id = u.id
where u.id = $1
order by p.date desc;
