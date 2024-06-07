window.onload = onWindowLoad
document.getElementById('logoutA').addEventListener('click', logout)
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

function onWindowLoad() {
    console.log('Window loaded')
    fetchPosts()
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

function fetchPosts() {
    fetch('loadPosts.php')
        .then(response => {
            if(!response.ok) {
                throw new Error('No posts found')
            }
            return response.json()
        })
        .then(posts => {
            posts.forEach(post => {
                createPost(post.imagePath, post.name + ' ' + post.surname, post.meetingID, post.title)
            })
        })
        .then(() =>{
            const posts = document.querySelectorAll('.post') // Get all the posts on the page
            console.log("Posts content: " + JSON.stringify(posts))
            rotatePosts(posts) // Rotate the posts
        })
        .catch(error => {
            // do nothing if there are no posts
        })
}

/**
 * Creates a new post to display in the homepage.
 * @param {string} imagePath path to the profile image
 * @param {string} author the author's name and surname
 */
function createPost(imagePath, author, postID, postTitle) {
    let template = document.createElement('template')
    template.innerHTML = postTemplate
    let img = template.content.querySelector('img')
    let p = template.content.querySelector('p')
    let a = template.content.querySelector('a')
    img.src = imagePath === '' ? "../database-content/profile-image/User-avatar.png" : imagePath
    p.textContent = author
    //a.href = link
    a.textContent = postTitle
    a.addEventListener("click", function(){
        $.ajax({
            type: "post",
            url: "loadPostDetails.php",
            data: {postID: postID},
            success: function(){
                console.log("In event listener, homepage/homepage.js in function createPost(), postID is set to: " + postID)
                window.location.href = '../postdetails/postdetails.html'
            }
        })
    })

    // Setting a random background image
    let div = template.content.querySelector('.post')
    let imageUrl = chooseRandomPostitBackground()
    console.log("Chosen random image: " + imageUrl)
    div.style.backgroundImage = `url(${imageUrl})`

    let container = document.querySelector('.postContainer')
    container.appendChild(template.content)
}

function logout() {
    $.ajax({
        type: "post",
        url: "logout.php",
        success: function() {
            window.location.href = '../loginpage/login.html'
        }
    })
}