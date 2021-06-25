CREATE TABLE users(
    id serial primary key,
    email varchar(50) UNIQUE not null,
    emailVerified  bool not null,
    password  varchar(100) not null,
    country varchar(5) not null,
    firstName varchar(50) not null,
    secondName varchar(50) not null,
    firstSurName varchar(50) not null,
    secondSurName varchar(50) not null,
    prefixNumber varchar(10) not null,
    phoneNumber varchar(10) not null,
    phoneNumberVerified bool not null,
    active bool not null,
    urlProfilePhoto  varchar(100) not null,
    loginAttempt numeric not null,
    isBusiness  bool not null,
    createDate date not null,
    modifyBy numeric,
    lastUpdateDate date
);

