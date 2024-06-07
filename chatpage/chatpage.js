fetch('chatpage.php').then(response => response.json())
.then(student => {
    console.log("baobao" + JSON.stringify(student))
        let img = document.getElementById("profile-img")
        img.src = student.imagePath !== '' ? student.imagePath : "../database-content/profile-image/User-avatar.png";
        let chatName = document.getElementById("chat-title")
        chatName.textContent = student.name;
    })
    .catch(error => console.error('Error:', error));