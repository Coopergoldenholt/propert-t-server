SELECT p.company_id, 
p.id,
p.property_id, 
p.date, 
p.user_id, 
p.summary,
p.title, 
p.managed_company_id, 
pr.name as property_name, 
mc.name as managed_company_name, 
u.email, 
u.first_name, 
u.last_name,
ARRAY(SELECT ROW(id, url, type_of_image) FROM post_images WHERE post_id = p.id)
FROM posts p

LEFT JOIN properties pr ON pr.id = p.property_id
LEFT JOIN managed_companies mc ON pr.managed_company_id = mc.id
LEFT JOIN users u ON u.id = p.user_id
WHERE p.property_id = $1
ORDER BY p.date DESC;