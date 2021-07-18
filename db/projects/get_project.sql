select u.name, u.id, up.project_id from users u 
join user_projects up on up.user_id = u.id
where up.project_id = $1;