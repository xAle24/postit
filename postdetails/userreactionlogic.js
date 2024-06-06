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

let buttons = document.querySelectorAll('.reactionButton')
console.log("Test")
buttons.forEach(button => {
    button.addEventListener('click', () => {
        console.log("Button clicked: " + button.id)
        $.ajax({
            url: 'updateUserReaction.php',
            type: 'POST',
            data: { reaction: button.id },
            success: function (response) {
                console.log("Server response: " + response)
                let selectedButton = JSON.parse(response)
                fetchReactionCounts()
                buttons.forEach(button => {
                    unhighlightButton(button)
                })
                if (selectedButton !== null) {
                    /* If the response is != from null, this is the button to select. */
                    highlightButton(button)
                }
            }
        })
    })
})

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

function highlightButton(button) {
    button.style.backgroundColor = 'rgba(235, 203, 216, 0.5)'
}

function unhighlightButton(button) {
    button.style.backgroundColor = 'transparent'
}
