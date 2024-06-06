// Initialize an object to store the count of clicks for each button.
// The object will have the button id as the key and the count as the value.
// One user can only choose one reaction per post.
let displayedReactionCounts = {
    likeButton: 0,
    dislikeButton: 0,
    starryEyesButton: 0,
    heartButton: 0,
    moaiButton: 0
}

// Query the database to get the user's existing reaction
let userReaction
fetchUserReaction()
let buttons = document.querySelectorAll('.reactionButton')

buttons.forEach(button => {
    // Highlight the button if it corresponds to the user's reaction
    if (userReaction === button.id) {
        button.style.backgroundColor = 'rgba(235, 203, 216, 0.5)'
    }

    button.addEventListener('click', () => {
        if (userReaction === button.id) {
            // The user clicked their existing reaction, so remove it
            removeUserReaction(button.id)
            displayedReactionCounts[button.id]--
            button.style.backgroundColor = 'transparent'
            userReaction = null
        } else {
            // The user clicked a new reaction, so update it
            updateUserReaction(button.id)
            if (userReaction !== null) {
                // The user had a previous reaction, so unhighlight it and decrement its count
                let previousButton = document.getElementById(userReaction)
                displayedReactionCounts[userReaction]--
                console.log("Looking for button with name: " + userReaction)
                writeButtonNumber(previousButton)
                previousButton.style.backgroundColor = 'transparent'
            }
            displayedReactionCounts[button.id]++
            button.style.backgroundColor = 'rgba(235, 203, 216, 0.5)'
            userReaction = button.id
        }
        writeButtonNumber(button)
    })
})

function fetchUserReaction() {
    // TODO: Implement this function to query the database and return the user's reaction
    fetch('fetchUserReaction.php')
        .then(response => response.text())
        .then(data => {
            userReaction = data
        })
        .catch(error => console.error(error))
}

function removeUserReaction() {
    // TODO: Implement this function to remove the user's reaction from the database
    $.ajax({
        url: 'removeUserReaction.php',
        type: 'POST',
        success: function (response) {
            console.log("Server response: " + response)
        }
    })
}

function updateUserReaction(reaction) {
    // TODO: Implement this function to update the user's reaction in the database
    $.ajax({
        url: 'updateUserReaction.php',
        type: 'POST',
        data: { reaction: reaction },
        success: function (response) {
            console.log("Server response: " + response)
        }
    })
}

function setReactionCounts(reactionCounts) {
    displayedReactionCounts.likeButton = reactionCounts.getThumbsUpNumber()
    displayedReactionCounts.dislikeButton = reactionCounts.getThumbsDownNumber()
    displayedReactionCounts.heartButton = reactionCounts.getHeartNumber()
    displayedReactionCounts.starryEyesButton = reactionCounts.getStarryEyesNumber()
    displayedReactionCounts.moaiButton = reactionCounts.getMoaiNumber()

    let buttons = document.querySelectorAll('.reactionButton')
    buttons.forEach(button => {
        writeButtonNumber(button)
    })
}

function writeButtonNumber(button) {
    let textNode = Array.from(button.childNodes).find(node => node.nodeType === Node.TEXT_NODE)
    if (textNode !== null) {
        textNode.textContent = displayedReactionCounts[button.id]
    } else {
        button.appendChild(document.createTextNode(displayedReactionCounts[button.id]))
    }
}
