-- USE THIS FILE AS A HELPER TO CREATE YOUR QUERIES IN PHP

-- Used to see all the educational resources, their authors, filepath and the name of the subject they belong to
SELECT `resourceName`, student.name, student.surname, `filePath`, subject.name as subject FROM `educational_resource`
JOIN subject ON educational_resource.`subjectID` = subject.subjectID
JOIN student ON student.email = educational_resource.email
ORDER BY resourceName ASC;

-- Insertion of a new meeting
INSERT INTO `meeting`(`meetingID`, `title`, `content`, `appointment`, `startTime`,
`endTime`, `type`, `timestamp`, `email`, `locationID`, `subjectID`) 
VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]',
'[value-6]','[value-7]','[value-8]','[value-9]','[value-10]','[value-11]');

-- Insertion of a new location
INSERT INTO `location`(`locationID`, `name`, `street`, `streetNumber`,
 `city`, `cap`) 
 VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]','[value-6]');

 -- Insertion of the post brief details in homepage
(SELECT meeting.meetingID, meeting.title, student.imagePath, student.name, student.surname
 FROM meeting
 JOIN student ON student.email = meeting.email
 WHERE meeting.email = 'lu@gmail.com')
 UNION
(SELECT meeting.meetingID, meeting.title, student.imagePath, student.name, student.surname
  FROM meeting
  JOIN adds ON meeting.email = adds.second_stu_email
  JOIN student ON student.email = meeting.email -- for the image path
  WHERE adds.first_stu_email = 'lu@gmail.com')
  
  -- Il primo Select trova tutti i post creati dall'utente loggato;
  -- Il secondo Select trova tutti i post la cui email sta nel campo
  -- second_stu_email, ossia l'email dell'amico, della tabella adds
  -- e filtra solo i post in cui il first_stu_email, cioè l'email
  -- della persona che ha aggiunto l'amico, è quella della
  -- persona loggata.
