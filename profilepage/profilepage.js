window.onload = onWindowLoad
let modifyButton = document.getElementById("imageInput")
let profileNameTag = document.getElementById("personName")

function onWindowLoad() {
    console.log('Window loaded')
    const posts = document.querySelectorAll('.post') // Get all the posts on the page
    rotatePosts(posts) // Rotate the posts
    $.ajax({
        url: 'profilepage.php',
        type: 'GET',
        success: function(data) {
            console.log('Data: ' + data)
            data = JSON.parse(data)
            if (data.imagePath !== '' && data.imagePath !== null && data.imagePath !== undefined && data.imagePath !== '[value-6]') {
                createNewImageEntry(data.imagePath)
            } else {
                createNewImageEntry("../database-content/profile-image/User-avatar.png")
            }
            if (data.name !== '' && data.name !== null && data.name !== undefined) {
                profileNameTag.innerHTML = data.name
            } else {
                profileNameTag.innerHTML = "Utente"
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + ' ' + errorThrown)
        }
    })
}

document.getElementById("imageInput").addEventListener("change", function() {
    this.form.submit()
})

function createNewImageEntry(imageName) {
    let image = document.getElementById("imageProfile")
    image.src = imageName
}

function rotatePosts(posts) {
    posts.forEach(post => {
        const randomAngle = Math.random() * 6 - 3 // Generate a random angle between -3 and 3 degrees
        console.log("Random angle: " + randomAngle)
        post.style.transform = `rotate(${randomAngle}deg)` // Apply the rotation to the post
    })
}

function openNav() {    
    document.getElementById("mySidenav").style.width = "250px"
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0"
}
