UPDATE users
SET password = $2, first_name = $3, last_name = $4
WHERE email = $1

returning *;