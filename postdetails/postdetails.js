// TODO: create unique ids for each post
// TODO: add logic to the "show more comments" button

// Initialize an object to store the count of clicks for each button.
// The object will have the button id as the key and the count as the value.
// One user can only choose one reaction per post.
let reactionCountsOfCurrentUser = {
    likeButton: 0,
    dislikeButton: 0,
    starryEyesButton: 0,
    heartButton: 0,
    moaiButton: 0
}

let numberOfComments = 2 //TODO: change this to the actual number of comments when the php part is included

let textarea = document.querySelector('.commentInputContainer textarea')
textarea.addEventListener('input', autoResize, false)
createBlurryBackgroundLayer()
addEventListenersToReactionButtons()

function autoResize() {
    // Reset the height
    this.style.height = 'auto';

    // Get the computed style of the textarea
    let computedStyle = window.getComputedStyle(this);

    // Calculate the vertical padding of the textarea
    let paddingTop = parseFloat(computedStyle.getPropertyValue('padding-top'));
    let paddingBottom = parseFloat(computedStyle.getPropertyValue('padding-bottom'));
    let lineHeight = parseFloat(computedStyle.getPropertyValue('font-size'));
    
    // Calculate the vertical padding, that needs to be removed from the scrollHeight
    // (which is the height of the content of the textarea, including the padding but not the border)
    let verticalPadding = paddingTop + paddingBottom + lineHeight;

    // Set the height to the scrollHeight minus the vertical padding
    this.style.height = (this.scrollHeight - verticalPadding) + 'px';
}

function createBlurryBackgroundLayer() {
    const container = document.getElementsByClassName('avatarContainer')[0]
    const profileImage = document.getElementById('mainAvatar')
    let backgroundImage = document.createElement('img')
    backgroundImage.src = profileImage.src
    backgroundImage.alt = 'Avatar'
    backgroundImage.className = 'mainAvatarBackground'
    container.appendChild(backgroundImage)
}

function addEventListenersToReactionButtons() {
    // Get all the reaction buttons
    let buttons = document.querySelectorAll('.reactionButton')

    // Add a click event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (reactionCountsOfCurrentUser[button.id] === 1) {
                reactionCountsOfCurrentUser[button.id]--
                button.style.backgroundColor = 'transparent'
            } else if (reactionCountsOfCurrentUser[button.id] === 0) {
                let previousReaction = getPreviousReaction(button.id)
                console.log(previousReaction)
                if (previousReaction !== undefined) {
                    reactionCountsOfCurrentUser[previousReaction.id]--
                    writeButtonNumber(previousReaction)
                    previousReaction.style.backgroundColor = 'transparent'
                }
                reactionCountsOfCurrentUser[button.id]++
                button.style.backgroundColor = 'rgba(235, 203, 216, 0.5)'
            }
            writeButtonNumber(button)
        })
    })
}

function writeButtonNumber(button) {
    let textNode = Array.from(button.childNodes).find(node => node.nodeType === Node.TEXT_NODE)
    if (textNode !== null) {
        textNode.textContent = reactionCountsOfCurrentUser[button.id]
    } else {
        button.appendChild(document.createTextNode(reactionCountsOfCurrentUser[button.id]))
    }
}

function getPreviousReaction(buttonId) {
    let buttons = document.querySelectorAll('.reactionButton')
    return [...buttons].filter(button => button.id !== buttonId)
        .filter(button => reactionCountsOfCurrentUser[button.id] === 1)[0]
}

function onCheckboxClick() {
    // Find the label with its 'for' attribute set to this input
    let label = document.querySelector(`label[for="${this.id}"]`)

    if (this.checked) {
        console.log("Checked checkbox with id: " + this.id)
        label.textContent = "Disponibile!"
        label.style.display = "block";
    } else {
        label.style.display = "none";
    }
}

function addComment() {
    const container = document.getElementById('commentsList')
    const textarea = document.querySelector('.commentInputContainer textarea')
    let template = document.createElement('template')
    template.innerHTML = commentHTMLtemplate.trim()
    let commentAuthor = template.content.querySelector('.commentAuthor') // get the comment author element
    commentAuthor.textContent = "Tu"
    let commentText = template.content.querySelector('.commentText') // get the comment text element
    commentText.textContent = textarea.value
    if (textarea.value === "") {
        return
    }
    commentText.innerHTML = commentText.textContent.replace(/\n/g, '<br>')
    container.appendChild(template.content)
    textarea.value = ""
    textarea.dispatchEvent(new Event('input')) // used to autmatically trigger autoResize() call

    let commentsNumberParagraph = document.querySelector('.commentsNumber')
    commentsNumberParagraph.textContent = ++numberOfComments;
}