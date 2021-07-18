CREATE TABLE "companies" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(500) UNIQUE
);

CREATE TABLE "managed_companies" (
  "id" SERIAL PRIMARY KEY,
  "managing_company_id" int,
  "name" varchar(200)
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar(500) UNIQUE,
  "first_name" varchar(200),
  "last_name" varchar(200),
  "type_of_user" varchar(100),
  "password" text,
  "company_id" int,
  "managed_company" int
);

CREATE TABLE "properties" (
  "id" SERIAL PRIMARY KEY,
  "company_id" int,
  "managed_company_id" int,
  "name" varchar(300)
);

CREATE TABLE "property_permissions" (
  "id" SERIAL PRIMARY KEY,
  "property_id" int,
  "user_id" int
);

CREATE TABLE "projects" (
  "id" SERIAL PRIMARY KEY,
  "company_id" int,
  "managed_company_id" int,
  "property_id" int,
  "summary" varchar(1000),
  "title" varchar(100)
);

CREATE TABLE "posts" (
  "id" SERIAL PRIMARY KEY,
  "company_id" int,
  "property_id" int,
  "project_id" int,
  "date" timestamp,
  "user_id" int,
  "summary" varchar(1000),
  "title" varchar(100),
  "managed_company_id" int
);

CREATE TABLE "project_users" (
  "id" SERIAL PRIMARY KEY,
  "project_id" int,
  "user_id" int
);

CREATE TABLE "post_images" (
  "id" SERIAL PRIMARY KEY,
  "post_id" int,
  "url" text,
  "type_of_image" text
);

ALTER TABLE "managed_companies" ADD FOREIGN KEY ("managing_company_id") REFERENCES "companies" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("managed_company") REFERENCES "managed_companies" ("id");

ALTER TABLE "properties" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id");

ALTER TABLE "properties" ADD FOREIGN KEY ("managed_company_id") REFERENCES "managed_companies" ("id");

ALTER TABLE "property_permissions" ADD FOREIGN KEY ("property_id") REFERENCES "properties" ("id");

ALTER TABLE "property_permissions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "projects" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id");

ALTER TABLE "projects" ADD FOREIGN KEY ("managed_company_id") REFERENCES "managed_companies" ("id");

ALTER TABLE "projects" ADD FOREIGN KEY ("property_id") REFERENCES "properties" ("id");

ALTER TABLE "posts" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id");

ALTER TABLE "posts" ADD FOREIGN KEY ("property_id") REFERENCES "properties" ("id");

ALTER TABLE "posts" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "posts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "posts" ADD FOREIGN KEY ("managed_company_id") REFERENCES "managed_companies" ("id");

ALTER TABLE "project_users" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "project_users" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "post_images" ADD FOREIGN KEY ("post_id") REFERENCES "posts" ("id");

