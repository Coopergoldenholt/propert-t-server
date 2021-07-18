delete from forms where project_id = $1;
delete from user_projects where project_id = $1;
delete from projects where id = $1;