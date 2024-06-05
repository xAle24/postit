-- student with most comment
SELECT email, COUNT(*) as comment_count
FROM COMMENT
GROUP BY email
ORDER BY comment_count DESC
LIMIT 1;
-- prof with most meeting
SELECT TEACHES.email, COUNT(*) as meeting_count
FROM STUDENT
JOIN MEETING ON STUDENT.email = MEETING.email
JOIN TEACHES ON STUDENT.email = TEACHES.email
GROUP BY TEACHES.email
ORDER BY meeting_count DESC
LIMIT 1;
-- post with most reaction
SELECT postID, COUNT(*) as reaction_count
FROM REACTIONS
GROUP BY postID
ORDER BY reaction_count DESC
LIMIT 1;
-- student with most comment and reaction this month
SELECT email, COUNT(*) as activity_count
FROM (
    SELECT email, timestamp FROM COMMENT
    UNION ALL
    SELECT email, timestamp FROM REACT
) as activities
WHERE MONTH(timestamp) = MONTH(CURRENT_DATE()) AND YEAR(timestamp) = YEAR(CURRENT_DATE())
GROUP BY email
ORDER BY activity_count DESC
LIMIT 1;
