-- Used to see all the educational resources, their authors, filepath and the name of the subject they belong to
-- Used to see all the educational resources, their authors, filepath and the name of the subject they belong to
SELECT `resourceName`, student.name, student.surname, `filePath`, subject.name as subject FROM `educational_resource`
JOIN subject ON educational_resource.`subjectID` = subject.subjectID
JOIN student ON student.email = educational_resource.email
ORDER BY resourceName ASC;