select f.type_of_work, f.name, f.image_one, f.image_two, f.image_three, f.image_four, f.image_five, f.image_six, f.image_seven, f.image_eight, p.name as property_name from forms f
join properties p on p.id = f.property_id
where property_id = $1 
ORDER BY date desc
OFFSET $2
Limit 15;