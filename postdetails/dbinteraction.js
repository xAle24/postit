function fetchPostDetails() {
    fetch('fetchPostDetails.php')
        .then(response => response.json())
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
}