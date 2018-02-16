create table form(
    name varchar(64) primary key not null,
    date timestamp with time zone default current_timestamp,
    email text,
    amount integer,
    ssn text
);