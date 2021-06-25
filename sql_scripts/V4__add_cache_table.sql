CREATE TABLE internal_cache(
    id serial primary key,
    key varchar(100) not null,
    value text not null,
    exp int
);

