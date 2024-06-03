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
            followBtn.textContent = 'Segui già';
            followBtn.addEventListener("click", function(){
                console.log(student)
                $.ajax({
                    type: "get",
                    url: "removefriend.php",
                    data: {email: student.email},
                    success: function(response){
                        if (response === "Success") {
                            followBtn.title = 'Segui';
                            followBtn.textContent = 'Segui';
                        }
                    }
                });
            });
            document.body.appendChild(template.content);
        });
    })
    .catch(error => console.error('Error:', error));
