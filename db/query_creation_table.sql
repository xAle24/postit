create table ACHIEVEMENT (
     achievementID char(36) not null DEFAULT (uuid()),
     name varchar(50) not null,
     description varchar(200) not null,
     constraint ID_ACHIEVEMENT_ID primary key (achievementID));

create table ACHIEVEMENT_STUDENT (
     assignedAchievementID char(36) not null DEFAULT (uuid()),
     achievementID char(36) not null DEFAULT (uuid()),
     appointment date not null,
     state char not null,
     email varchar(50) not null,
     constraint ID_ACHIEVEMENT_STUDENT_ID primary key (assignedAchievementID),
     constraint SID_ACHIE_ACHIE_ID unique (achievementID));

create table ADDS (
     first_stu_email varchar(30) not null,
     second_stu_email varchar(30) not null,
     constraint ID_ADDS_ID primary key (second_stu_email, first_stu_email));

create table AVAILABILITY (
     email varchar(50) not null,
     meetingID char(36) not null DEFAULT (uuid()),
     constraint ID_AVAILABILITY_ID primary key (meetingID, email));

create table COMMENT (
     commentID char(36) not null DEFAULT (uuid()),
     content varchar(200) not null,
     meetingID char(36) not null DEFAULT (uuid()),
     email varchar(50) not null,
     constraint ID_COMMENT_ID primary key (commentID));

create table COURSE (
     courseID char(36) not null DEFAULT (uuid()),
     name varchar(50) not null,
     type char not null,
     constraint ID_COURSE_ID primary key (courseID));

create table EDUCATIONAL_RESOURCE (
     resourceID char(36) not null DEFAULT (uuid()),
     resourceName varchar(50) not null,
     filePath varchar(200) not null,
     type numeric(1) not null,
     email varchar(50) not null,
     subjectID char(36) not null DEFAULT (uuid()),
     constraint ID_EDUCATIONAL_RESOURCE_ID primary key (resourceID));

create table GROUPS (
     groupID char(36) not null DEFAULT (uuid()),
     name varchar(50) not null,
     groupParticipantsNumber numeric(4) not null,
     email varchar(50) not null,
     constraint ID_GROUPS_ID primary key (groupID));

create table INSIDE (
     subjectID char(36) not null DEFAULT (uuid()),
     courseID char(36) not null DEFAULT (uuid()),
     constraint ID_INSIDE_ID primary key (courseID, subjectID));

create table IS_IN (
     email varchar(50) not null,
     groupID char(36) not null DEFAULT (uuid()),
     constraint ID_IS_IN_ID primary key (groupID, email));

create table LOCATION (
     locationID char(36) not null DEFAULT (uuid()),
     name varchar(50) not null,
     street varchar(50) not null,
     streetNumber numeric(4) not null,
     city varchar(50) not null,
     cap numeric(5) not null,
     constraint ID_LOCATION_ID primary key (locationID));

create table MEETING (
     meetingID char(36) not null DEFAULT (uuid()),
     content varchar(200) not null,
     appointment date not null,
     startTime numeric(2) not null,
     endTime numeric(2) not null,
     type numeric(1) not null,
     email varchar(50) not null,
     locationID char(36) not null DEFAULT (uuid()),
     subjectID varchar(10),
     constraint ID_MEETING_ID primary key (meetingID));

create table MESSAGE (
     messageID char(36) not null DEFAULT (uuid()),
     content varchar(200) not null,
     rec_email varchar(10),
     Sen_email varchar(10) not null,
     groupID char(36) DEFAULT (uuid()),
     constraint ID_MESSAGE_ID primary key (messageID));

create table NOTIFICATION (
     notificationID char(36) not null DEFAULT (uuid()),
     description varchar(200) not null,
     state char not null,
     email varchar(50) not null,
     constraint ID_NOTIFICATION_ID primary key (notificationID));

create table PROFESSOR (
     name varchar(50) not null,
     surname varchar(50) not null,
     birthdate date not null,
     email varchar(50) not null,
     constraint ID_PROFESSOR_ID primary key (email));

create table REACT (
     email varchar(50) not null,
     meetingID char(36) not null DEFAULT (uuid()),
     type numeric(2) not null,
     constraint ID_REACT_ID primary key (email, meetingID));

create table STUDENT (
     name varchar(50) not null,
     surname varchar(50) not null,
     birthdate date not null,
     password varchar(50) not null,
     email varchar(50) not null,
     imagePath varchar(200) not null,
     constraint ID_STUDENT_ID primary key (email));

create table SUBJECT (
     subjectID char(36) not null DEFAULT (uuid()),
     name varchar(50) not null,
     CFU numeric(2) not null,
     constraint ID_SUBJECT_ID primary key (subjectID));

create table TEACHES (
     subjectID char(36) not null DEFAULT (uuid()),
     email varchar(50) not null,
     constraint ID_TEACHES_ID primary key (email, subjectID));


-- Constraints Section
-- ___________________ 

alter table ACHIEVEMENT_STUDENT add constraint REF_ACHIE_STUDE_FK
     foreign key (email)
     references STUDENT (email);

alter table ACHIEVEMENT_STUDENT add constraint SID_ACHIE_ACHIE_FK
     foreign key (achievementID)
     references ACHIEVEMENT (achievementID);

alter table ADDS add constraint REF_ADDS_STUDE_1
     foreign key (second_stu_email)
     references STUDENT (email);

alter table ADDS add constraint REF_ADDS_STUDE_FK
     foreign key (first_stu_email)
     references STUDENT (email);

alter table AVAILABILITY add constraint EQU_AVAIL_MEETI
     foreign key (meetingID)
     references MEETING (meetingID);

alter table AVAILABILITY add constraint REF_AVAIL_STUDE_FK
     foreign key (email)
     references STUDENT (email);

alter table COMMENT add constraint REF_COMME_MEETI_FK
     foreign key (meetingID)
     references MEETING (meetingID);

alter table COMMENT add constraint REF_COMME_STUDE_FK
     foreign key (email)
     references STUDENT (email);

alter table EDUCATIONAL_RESOURCE add constraint REF_EDUCA_STUDE_FK
     foreign key (email)
     references STUDENT (email);

alter table EDUCATIONAL_RESOURCE add constraint REF_EDUCA_SUBJE_FK
     foreign key (subjectID)
     references SUBJECT (subjectID);

alter table GROUPS add constraint REF_GROUP_STUDE_FK
     foreign key (email)
     references STUDENT (email);

alter table INSIDE add constraint EQU_INSID_COURS
     foreign key (courseID)
     references COURSE (courseID);

alter table INSIDE add constraint REF_INSID_SUBJE_FK
     foreign key (subjectID)
     references SUBJECT (subjectID);

alter table IS_IN add constraint EQU_IS_IN_GROUP
     foreign key (groupID)
     references GROUPS (groupID);

alter table IS_IN add constraint REF_IS_IN_STUDE_FK
     foreign key (email)
     references STUDENT (email);

alter table MEETING add constraint REF_MEETI_STUDE_FK
     foreign key (email)
     references STUDENT (email);

alter table MEETING add constraint REF_MEETI_LOCAT_FK
     foreign key (locationID)
     references LOCATION (locationID);

alter table MEETING add constraint REF_MEETI_SUBJE_FK
     foreign key (subjectID)
     references SUBJECT (subjectID);

alter table MESSAGE add constraint REF_MESSA_STUDE_1_FK
     foreign key (rec_email)
     references STUDENT (email);

alter table MESSAGE add constraint REF_MESSA_STUDE_FK
     foreign key (Sen_email)
     references STUDENT (email);

alter table MESSAGE add constraint REF_MESSA_GROUP_FK
     foreign key (groupID)
     references GROUPS (groupID);

alter table NOTIFICATION add constraint REF_NOTIF_STUDE_FK
     foreign key (email)
     references STUDENT (email);

alter table REACT add constraint REF_REACT_MEETI_FK
     foreign key (meetingID)
     references MEETING (meetingID);

alter table REACT add constraint REF_REACT_STUDE
     foreign key (email)
     references STUDENT (email);

alter table TEACHES add constraint EQU_TEACH_PROFE
     foreign key (email)
     references PROFESSOR (email);

alter table TEACHES add constraint EQU_TEACH_SUBJE_FK
     foreign key (subjectID)
     references SUBJECT (subjectID);

-- Create the trigger
DELIMITER //
CREATE TRIGGER after_student_insert
AFTER INSERT
ON student FOR EACH ROW
BEGIN
   INSERT INTO achievement_student (assignedAchievementID, achievementID, appointment, state, email)
   SELECT UUID(), achievement.achievementID, NULL, FALSE, NEW.email
   FROM achievement;
END; //
DELIMITER ;