alter table ecommerce.users drop column active;
alter table ecommerce.users ADD COLUMN active boolean not null default true