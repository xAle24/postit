// This constant is used to avoid spawning the postits on the border of the screen
const postitDiagonalDimension = 71
var form = document.getElementById("form");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm)
window.onload = generatePostits
window.addEventListener('resize', generatePostits)

/**
 * Generates 60 random postits on the screen.
 */
function generatePostits() {
    clearPostits()
    var images = [
        '../resources/postit-no-writings/dark-green-logo-no-notice-board.png',
        '../resources/postit-no-writings/light-blue-logo-no-notice-board.png',
        '../resources/postit-no-writings/light-green-logo-no-notice-board.png',
        '../resources/postit-no-writings/orange-logo-no-notice-board.png',
        '../resources/postit-no-writings/pink-logo-no-notice-board.png',
        '../resources/postit-no-writings/purple-logo-no-notice-board.png',
        '../resources/postit-no-writings/red-logo-no-notice-board.png',
        '../resources/postit-no-writings/yellow-logo-no-notice-board.png',
    ]
    for (var i = 0; i < 60; i++) {
        var img = document.createElement('img')
        img.src = images[Math.floor(Math.random() * images.length)]
        img.className = 'randomImage';
        img.alt = ""
        img.style.top = Math.random() * (window.innerHeight - postitDiagonalDimension) + 'px'
        img.style.left = Math.random() * (window.innerWidth - postitDiagonalDimension) + 'px'
        img.style.transform = 'rotate(' + Math.random() * 360 + 'deg)'
        document.body.appendChild(img)
    }
}

/**
 * Call this to clear the postits from the screen.
 */
function clearPostits() {
    var postits = document.getElementsByClassName('randomImage')
    while (postits.length > 0) {
        postits[0].parentNode.removeChild(postits[0])
    }
}

function submitForm() {
    var name = document.getElementById("name").value;
    var surname= document.getElementById("surname").value;
    var date = document.getElementById("date").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var repeatPassword = document.getElementById("repeatPassword").value;
    if (name === "" || surname === "" || email === "" || date === "" || password === "") {
        alert("Errore: tutti i campi devono essere compilati.");
        return ;
    }
    if (password !== repeatPassword) {
        alert("Errore: le password non corrispondono.");
        return ;
    }
    
    $.ajax({
        type: "post",
        url: "registration.php",
        data: $("#form").serialize(),
        success: function(response) {
            if (response === "Email already exists") {
                alert("Questo indirizzo email è già registrato.");
            } else {
                window.location.href = "../homepage/homepage.html";
            }
        }
    });
}


function showPopup(message) {
    // Create a popup notification
    var notification = document.createElement("div");
    notification.id = "notification";
    notification.innerHTML = message;

    // Add the notification to the form's parent element
    document.getElementById("form").appendChild(notification);

    // Remove the notification after 3 seconds
    setTimeout(function() {
        document.getElementById("form").removeChild(notification);
    }, 3000);
}
