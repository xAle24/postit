// FETCHING DATA FROM THE SERVER

// Fetch the post details
console.log("Fetching main post details: ")
fetchMainPostDetails()
fetchReactionCounts()
//fetchNumberOfAvailablePeople()
fetchComments()

let numberOfComments = 0

let textarea = document.querySelector('.commentInputContainer textarea')
textarea.addEventListener('input', autoResize, false)
    
function changeProfileImage(imagePath) {
    let profileImage = document.getElementById('mainAvatar')
    profileImage.src = imagePath
    createBlurryBackgroundLayer()
}

function changePostTitle(postTitle) {
    let title = document.getElementById('postTitle')
    title.textContent = postTitle
}

function setAuthor(authorName, authorSurname) {
    let author = document.getElementById('authorName')
    author.textContent = authorName + " " + authorSurname
}

function setContent(content) {
    let contentParagraph = document.querySelector('.descriptionParagraph')
    contentParagraph.textContent = content
}

function setAvailability(availability) {
    const availabilityContainer = document.querySelector('.availabilitiesBox')
    let template = document.createElement('template')
    template.innerHTML = availabilityTemplate.trim()
    let availabilityParagraph = template.content.querySelector('.availabilityParagraph')

    // Creating the date
    parseDate(availability, availabilityParagraph)

    // adding database update part
    let availabilityCheckbox = template.content.querySelector('#availabilityCheckbox')
    availabilityCheckbox.addEventListener('change', function () {
        if (availabilityCheckbox.checked) {
            $.ajax({
                url: 'updateAvailability.php',
                type: 'POST',
                success: function (response) {
                    console.log("Server response: " + response)
                    fetchNumberOfAvailablePeople()
                }
            })
        } else {
            $.ajax({
                url: 'removeAvailability.php',
                type: 'POST',
                success: function (response) {
                    console.log("Server response: " + response)
                    fetchNumberOfAvailablePeople()
                }
            })
        }
    })
    // Asking the db if the user is available
    $.ajax({
        url: 'isUserAvailable.php',
        type: 'POST',
        success: function (response) {
            console.log("Server response: " + response)
            availabilityCheckbox.checked = response === 'true'
            if (availabilityCheckbox.checked) {
                let label = document.querySelector(`label[for="availabilityCheckbox"]`)
                label.textContent = "Disponibile!"
                label.style.display = "block";
            }
        }
    })
    availabilityContainer.appendChild(template.content)
}

function parseDate(availability, availabilityParagraph) {
    let date = new Date(availability.getAvailabilityDate())
    let options = { weekday: 'long', month: 'long', day: 'numeric' }
    let formattedDate = new Intl.DateTimeFormat('it-IT', options).format(date)
    // Capitalise the first letter
    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
    let year = date.getFullYear()

    let startTime = availability.getStartTime().split(':').slice(0, 2).join(':')
    let endTime = availability.getEndTime().split(':').slice(0, 2).join(':')

    availabilityParagraph.textContent =
        formattedDate + ' ' + year
        + ', dalle ore '
        + startTime
        + ' alle ore '
        + endTime
}

function setAvailabilityDisplayedText(numberOfAvailablePeople) {
    let availabilityNode = document.querySelector('.availability')
    let isCheckedByCurrentUser = document.getElementById('availabilityCheckbox').checked
    let paragraph = availabilityNode.querySelector('.availablePeopleParagraph')
    let string
    if (isCheckedByCurrentUser) {
        string = "Tu "
        switch (numberOfAvailablePeople) {
            case 1:
                string += "sei l'unica persona disponibile"
                break
            case 2:
                string += "e un'altra persona disponibile"
                break
            default:
                string += `e altre ${numberOfAvailablePeople} persone disponibili`
        }
        paragraph.textContent = string
    } else {
        string = ""
        switch (numberOfAvailablePeople) {
            case 0:
                string += "Nessuna persona disponibile"
                break
            case 1:
                string += "Una persona disponibile"
                break
            default:
                string += `${numberOfAvailablePeople} persone disponibili`
        }
    }
    paragraph.textContent = string
}

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
    const textarea = document.querySelector('.commentInputContainer textarea')
    if (textarea.value === "") {
        return
    }
    // update db
    $.ajax({
        url: 'addComment.php',
        type: 'POST',
        data: { content: textarea.value },
        success: function (response) {
            console.log("Server response: " + response)
            createComment(JSON.parse(response), false) // I want this comment to be added at the top
        }
    })
    textarea.value = ""
}

function createComment(comment, append = true) {
    console.log("In the postdetails.js function: " + JSON.stringify(comment))

    const container = document.getElementById('commentsList')
    let template = document.createElement('template')
    template.innerHTML = commentHTMLtemplate.trim()
    let commentAuthor = template.content.querySelector('.commentAuthor') // get the comment author element
    commentAuthor.textContent = comment.name + ' ' + comment.surname
    let commentText = template.content.querySelector('.commentText') // get the comment text element
    commentText.textContent = comment.content
    commentText.innerHTML = commentText.textContent.replace(/\n/g, '<br>')

    let commentsNumberParagraph = document.querySelector('.commentsNumber')
    commentsNumberParagraph.textContent = ++numberOfComments;

    let pictureProfile = template.content.querySelector('.avatar')
    pictureProfile.src = comment.imagePath !== '' ? comment.imagePath : 'https://www.w3schools.com/howto/img_avatar.png'
    if (!append) {
        container.prepend(template.content)
    } else {
        container.appendChild(template.content)
    }
}