// TODO: create unique ids for each post

// Initialize an object to store the count of clicks for each button.
// The object will have the button id as the key and the count as the value.
// One user can only react with one type of each reaction per post.
let reactionCountsOfCurrentUser = {
    likeButton: 0,
    dislikeButton: 0,
    starryEyesButton: 0,
    heartButton: 0,
    moaiButton: 0
}

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
    console.log("Padding top: " + paddingTop + ", paddingBottom: " + paddingBottom + ", lineHeight: " + lineHeight)
    console.log("Scroll height: " + this.scrollHeight)
    
    let verticalPadding = paddingTop + paddingBottom + lineHeight;

    // Set the height to the scrollHeight minus the vertical padding
    this.style.height = (this.scrollHeight - verticalPadding) + 'px';
}

/* function autoResize() {
    let linesCount = this.value.split('\n').length
    this.style.height = linesCount + 'lh' // lh stands for line height
} */

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
                reactionCountsOfCurrentUser[button.id]++
                button.style.backgroundColor = 'rgba(235, 203, 216, 0.5)'
            }
            let textNode = Array.from(button.childNodes).find(node => node.nodeType === Node.TEXT_NODE)
            if (textNode !== null) {
                textNode.textContent = reactionCountsOfCurrentUser[button.id]
            } else {
                button.appendChild(document.createTextNode(reactionCountsOfCurrentUser[button.id]))
            }
        })
    })
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
    container.appendChild(template.content)
    textarea.value = ""
    textarea.dispatchEvent(new Event('input')) // used to autmatically trigger autoResize() call
}