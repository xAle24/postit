fetch('friend.php').then(response => response.json())
    .then(students => {
        students.forEach(student => {
            let template = document.createElement('template')
            template.innerHTML = friendInfoTemplate.trim()
            let img = template.content.querySelector('.profileImg')
            img.src = '../resources/straight-post-it.png';
            let h2 = template.content.querySelector('.profileName')
            h2.textContent = student.name;
            let followBtn = template.content.querySelector('.follow-button')
            followBtn.title = 'Follow';
            followBtn.textContent = 'Followed';
            document.body.appendChild(template.content);
        });
    })
    .catch(error => console.error('Error:', error));
