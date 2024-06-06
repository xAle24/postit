fetch('groupsmainpage.php').then(response => response.json())
    .then(students => {
        students.forEach(student => {
            let template = document.createElement('template')
            template.innerHTML = groupsListTemplate.trim()
            let img = template.content.querySelector('.groupsImg')
            img.src = '../resources/straight-post-it.png';
            let h2 = template.content.querySelector('.groupsH2')
            h2.textContent = student.name;
            let groups = template.content.querySelector('.groups')
            groups.addEventListener("click", function(){
                console.log(student)
                $.ajax({
                    type: "post",
                    url: "groupsLoad.php",
                    data: {email: student.email},
                    success: function(){
                        window.location.href = 'groupspage.html';
                    }
                });
            });
            document.getElementById("groups-list").appendChild(template.content);
        });
    })
    .catch(error => console.error('Error:', error));