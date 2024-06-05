fetch('chatmainpage.php').then(response => response.json())
    .then(students => {
        students.forEach(student => {
            let template = document.createElement('template')
            template.innerHTML = chatListTemplate.trim()
            let img = template.content.querySelector('.chatImg')
            img.src = '../resources/straight-post-it.png';
            let h2 = template.content.querySelector('.chatH2')
            h2.textContent = student.name;
            let chat = template.content.querySelector('.chat')
            chat.addEventListener("click", function(){
                console.log(student)
                $.ajax({
                    type: "post",
                    url: "chatLoad.php",
                    data: {email: student.email},
                    success: function(){
                        window.location.href = 'chatpage.html';
                    }
                });
            });
            document.getElementById("chat-list").appendChild(template.content);
        });
    })
    .catch(error => console.error('Error:', error));