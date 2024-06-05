window.onload = onWindowLoad

function onWindowLoad() {
    console.log('Window loaded')
    const posts = document.querySelectorAll('.post') // Get all the posts on the page
    rotatePosts(posts) // Rotate the posts
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
document.getElementById("notificationBtn").onclick = function() {
    var x = document.getElementById("notification");
    if (x.style.display === "none") {
        x.style.display = "block";
        setTimeout(function() {
            x.className = "show";
        }, 10); // Timeout for CSS transition
    } else {
        x.className = "";
        setTimeout(function() {
            x.style.display = "none";
        }, 300); // Timeout for CSS transition
    }
}