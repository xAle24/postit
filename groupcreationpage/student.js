fetch('student.php').then(response => response.json())
    .then(students => {
        students.forEach(student => {
            let template = document.createElement('template')
            template.innerHTML = studentInfoTemplate.trim()
            let img = template.content.querySelector('.profileImg')
            img.src = '../resources/straight-post-it.png';
            let h2 = template.content.querySelector('.profileName')
            h2.textContent = student.name;
            let addBtn = template.content.querySelector('.add-button')
            addBtn.title = 'Add';
            addBtn.textContent = 'Aggiunto';
            addBtn.addEventListener("click", function(){
                console.log(student)
                $.ajax({
                    type: "get",
                    url: "removestudent.php",
                    data: {email: student.email},
                    success: function(response){
                        if (response === "Success") {
                            addBtn.title = 'Aggiungi';
                            addBtn.textContent = 'Aggiungi';
                        }
                    }
                });
            });
            document.body.appendChild(template.content);
        });
    })
    .catch(error => console.error('Error:', error));
