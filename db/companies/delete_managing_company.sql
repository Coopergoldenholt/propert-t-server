delete from forms where managed_company_id = $1;
delete from properties where managed_company_id = $1;
delete from users where managed_company_id = $1;
delete from managed_companies where id = $1;