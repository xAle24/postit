function chooseRandomPostitBackground() {
    var images = [
        '../resources/postit-for-posts/azure-post-postit.png',
        '../resources/postit-for-posts/green-post-postit.png',
        '../resources/postit-for-posts/pink-post-postit.png',
        '../resources/postit-for-posts/gray-post-postit.png'
    ]
    return images[Math.floor(Math.random() * images.length)]
}