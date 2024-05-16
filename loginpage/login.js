window.onload = function() {
    var images = [
        '../resources/postit-no-writings/dark-green-logo-no-notice-board.png',
        '../resources/postit-no-writings/light-blue-logo-no-notice-board.png',
        '../resources/postit-no-writings/light-green-logo-no-notice-board.png',
        '../resources/postit-no-writings/orange-logo-no-notice-board.png',
        '../resources/postit-no-writings/pink-logo-no-notice-board.png',
        '../resources/postit-no-writings/purple-logo-no-notice-board.png',
        '../resources/postit-no-writings/red-logo-no-notice-board.png',
        '../resources/postit-no-writings/yellow-logo-no-notice-board.png',
    ];
    var background = document.getElementById('background');

    for (var i = 0; i < 30; i++) {
        var img = document.createElement('img');
        img.src = images[Math.floor(Math.random() * images.length)];
        img.className = 'randomImage';
        img.style.top = Math.random() * window.innerHeight + 'px';
        img.style.left = Math.random() * window.innerWidth + 'px';
        img.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
        document.body.appendChild(img);
    }
};
