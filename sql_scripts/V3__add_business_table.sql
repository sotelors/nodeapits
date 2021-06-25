CREATE TABLE business(
    id serial primary key,
    keyLegalRepresentative  varchar(30) not null,
    firstNameLegalRepresentative varchar(30) not null,
    secondNameLegalRepresentative varchar(30) not null,
    firstSurNameLegalRepresentative varchar(30) not null,
    secondSurNameLegalRepresentative varchar(30) not null,
    keyBusiness varchar(30) not null,
    businessName varchar(50) not null,
    businessFantasyName varchar(50) not null,
    apikey varchar(100) not null,
    country varchar(2) not null,
    department numeric not null,
    municipality numeric not null,
    description varchar(200) not null,
    idUser int not null,
    active  bool not null,
    createDate date not null,
    modifyBy numeric,
    lastUpdateDate date,
    CONSTRAINT fk_user_business
      FOREIGN KEY(idUser) 
	  REFERENCES users(id)
);

