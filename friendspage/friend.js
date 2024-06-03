fetch('friend.php').then(response => response.json())
    .then(students => {
        students.forEach(student => {
            // Create new div element
            let div = document.createElement('div');
            div.className = 'friendBlock';

            let infoDiv = document.createElement('div');
            infoDiv.className = 'friendInfo';
            div.appendChild(infoDiv);
            // Create img element
            let img = document.createElement('img');
            img.className = 'profileImg';
            img.src = '../resources/straight-post-it.png';
            infoDiv.appendChild(img);

            // Create h2 element
            let h2 = document.createElement('h2');
            h2.className = 'profileName';
            h2.textContent = student.name;  // Use the student's name from the PHP query result
            infoDiv.appendChild(h2);

            let followBtn = document.createElement('button');
            followBtn.className = 'follow-button';
            followBtn.title = 'Follow';
            followBtn.textContent = 'Followed';
            // Append the div to the body (or another container element)
            div.appendChild(followBtn);
            document.body.appendChild(div);
        });
    })
    .catch(error => console.error('Error:', error));
