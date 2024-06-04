window.onload = onWindowLoad

function onWindowLoad() {
    console.log('Window loaded')
    const posts = document.querySelectorAll('.post') // Get all the posts on the page
    rotatePosts(posts) // Rotate the posts
    $.ajax({
        url: 'profilepage.php',
        type: 'GET',
        success: function(data) {
            console.log("Weee" + data)
            // Parse the JSON data returned by the PHP script
            // var profile = JSON.parse(data)
            console.log("RESOURCES:" + data.imagePath)
            if (data.imagePath !== '' && data.imagePath !== null && data.imagePath !== undefined) {
                createNewImageEntry(data.imagePath)
            } else {
                createNewImageEntry("../database-content/profile-image/Haikyuu.png")
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + ' ' + errorThrown)
        }
    })
}

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
