fetch('groupspage.php').then(response => response.json())
.then(student => {
    console.log("baobao" + JSON.stringify(student))
        let img = document.getElementById("profile-img")
        img.src = student.imagePath;
        let groupsName = document.getElementById("groups-title")
        groupsName.textContent = student.name;
    })
    .catch(error => console.error('Error:', error));