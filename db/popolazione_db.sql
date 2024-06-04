-- Filling the achievement table
INSERT INTO `achievement`(`achievementID`, `name`, `description`) VALUES (UUID(),'Benvenuto in POST-I.T.','Hai effettuato la registrazione e il login.');
INSERT INTO `achievement`(`achievementID`, `name`, `description`) VALUES (UUID(),'Chi trova un amico, trova un tesoro','Hai seguito un amico.');
INSERT INTO `achievement`(`achievementID`, `name`, `description`) VALUES (UUID(),'Organizzatore novello','Hai pubblicato il tuo primo post per creare un incontro.');
-- Filling the subject table
INSERT INTO `subject`(`subjectID`, `name`, `CFU`) VALUES (UUID(), 'OOP', 12);
INSERT INTO `subject`(`subjectID`, `name`, `CFU`) VALUES (UUID(), 'WEB', 6);
INSERT INTO `subject`(`subjectID`, `name`, `CFU`) VALUES (UUID(), 'IOT', 42);
INSERT INTO `subject`(`subjectID`, `name`, `CFU`) VALUES (UUID(), 'MOBILE', 6);