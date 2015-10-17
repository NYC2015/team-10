
USE rocktheearth;

CREATE TABLE IF NOT EXISTS user (
	pk int unsigned auto_increment primary key, 
	isadmin BOOL NOT NULL,
	name VARCHAR(20) NOT NULL, 
	password VARCHAR(20) NOT NULL, 
	email VARCHAR(20) NOT NULL, 
	zip CHAR(5) NOT NULL, 
	phonenumber VARCHAR(20)
);


CREATE TABLE IF NOT EXISTS campaign (
	pk int unsigned auto_increment primary key,
	fkuser int unsigned,
	title VARCHAR(20),
	description VARCHAR(20),
	zip CHAR(5),
	viewcount int unsigned,
	donatelink VARCHAR(20),
	FOREIGN KEY (fkuser)
		REFERENCES user(pk)	
);


CREATE TABLE IF NOT EXISTS photo (
	pk int unsigned auto_increment primary key,
	pathname VARCHAR(20) NOT NULL,
	fkuser int unsigned,
	fkcampaign int unsigned, 
	iscover BOOL,
	FOREIGN KEY (fkuser)
		REFERENCES user(pk),
	FOREIGN KEY (fkcampaign)
		REFERENCES campaign(pk)
);

CREATE TABLE IF NOT EXISTS volunteering (
	pk int unsigned auto_increment primary key,
	fkcampaign int unsigned,
	description VARCHAR(500),
	FOREIGN KEY (fkcampaign)
		REFERENCES campaign(pk)
); 

#M2M user to campaign
CREATE TABLE IF NOT EXISTS usersupport (
	fkuser int unsigned,
	fkcampaign int unsigned,
	FOREIGN KEY (fkuser)
		REFERENCES user(pk),
	FOREIGN KEY (fkcampaign)
		REFERENCES campaign(pk)
);

#M2M social networking monday 88 desert rat
CREATE TABLE IF NOT EXISTS userfriends (
	fkuser int unsigned,
	fkuser2 int unsigned,
	FOREIGN KEY (fkuser)
		REFERENCES user(pk),
	FOREIGN KEY (fkuser2)
		REFERENCES user(pk)
);

#M2M user to volunteering
CREATE TABLE IF NOT EXISTS uservolunteer (
	fkuser int unsigned,
	fkvolunteer int unsigned,
	FOREIGN KEY (fkuser)
		REFERENCES user(pk),
	FOREIGN KEY (fkvolunteer)
		REFERENCES volunteering(pk)
);