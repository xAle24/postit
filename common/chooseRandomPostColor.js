function chooseRandomPostitBackground() {
    var images = [
        '../resources/postit-for-posts/aqua-post-postit.png',
        '../resources/postit-for-posts/azure-post-postit.png',
        '../resources/postit-for-posts/blue-post-postit.png',
        '../resources/postit-for-posts/dark-green-post-postit.png',
        '../resources/postit-for-posts/fucsia-post-postit.png',
        '../resources/postit-for-posts/green-post-postit.png',
        '../resources/postit-for-posts/medium-green-post-postit.png',
        '../resources/postit-for-posts/orange-post-postit.png',
        '../resources/postit-for-posts/pink-post-postit.png',
        '../resources/postit-for-posts/purple-post-postit.png',
        '../resources/postit-for-posts/red-post-postit.png',
        '../resources/postit-for-posts/yellow-post-postit.png'
    ]
    return images[Math.floor(Math.random() * images.length)]
}