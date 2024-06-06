let global_postTitle
let global_authorPicturePath
let global_authorName
let global_authorSurname
let global_reactionCounts
let global_availability
let global_postComments = []
let global_numberOfAvailablePeople
let global_content

function updateDatabase() {
    // Check if the details are ok
    if (newDetailsData.userEmail === null) {
        throw new Error("User email is null, in function updateDatabase in file postdetails/dbinteraction.js")
    }
    $.ajax({
        type: "post",
        url: "updateDatabase.php",
        data: {
            selectedReaction: newDetailsData.selectedReaction,
            addedComments: newDetailsData.addedComments,
            addedAvailability: newDetailsData.addedAvailability,
            userEmail: newDetailsData.userEmail
        },
        success: function (response) {
            console.log("Server response: " + response)
        },
        error: function (response) {
            console.log("Server response: " + response)
        }
    })
}

function fetchMainPostDetails() {
    fetch('fetchMainPostDetails.php')
        .then(response => response.json())
        .then(response => {
            console.log("Server response: " + JSON.stringify(response))
            // TODO: populate the global variable fetchedCurrentPostDetailsData
            global_postTitle = response.title
            global_authorName = response.name
            global_authorSurname = response.surname
            global_authorPicturePath = response.imagePath
            global_availability = new Availability(
                response.appointment,
                response.startTime,
                response.endTime
            )
            global_content = response.content
        })
        .then(() => {
            changeProfileImage(global_authorPicturePath)
            changePostTitle(global_postTitle)
            setAuthor(global_authorName, global_authorSurname)
            setAvailability(global_availability)
            setContent(global_content)
        })
        .then(() => fetchNumberOfAvailablePeople())
}

function fetchReactionCounts() {
    fetch('fetchReactionCounts.php')
        .then(response => response.json())
        .then(response => {
            console.log("Server response: " + JSON.stringify(response))
            global_reactionCounts = new ReactionCounts(
                response.type0_count,
                response.type1_count,
                response.type2_count,
                response.type3_count,
                response.type4_count
            )
        })
        .then(() => {
            setReactionCounts(global_reactionCounts)
        })
}

function fetchNumberOfAvailablePeople() {
    fetch('fetchNumberOfAvailablePeople.php')
        .then(response => response.json())
        .then(response => {
            console.log("Server response: " + JSON.stringify(response))
            // TODO: populate the global variable fetchedCurrentPostDetailsData
            global_numberOfAvailablePeople = response.people_joined
        })
        .then(() => {
            setAvailabilityDisplayedText(global_numberOfAvailablePeople)
        })
}

function fetchComments() {
    fetch('fetchComments.php')
        .then(response => response.json())
        .then(comments => {
            console.log("Server response: " + JSON.stringify(comments))
            // TODO: populate the global variable fetchedCurrentPostDetailsData
            comments.forEach(comment => {
                console.log("Comment: " + JSON.stringify(comment))
                global_postComments.push(new Comment(
                    comment.authorName,
                    comment.authorSurname,
                    comment.authorPicturePath,
                    comment.commentText
                ))
                createComment(comment)
            })
        })
        .then(() => {
            console.log("Global post comments: " + JSON.stringify(global_postComments))
        })
}

function isUserAvailable() {
    $.ajax({
        type: "post",
        url: "isUserAvailable.php",
        success: function (response) {
            console.log("Server response: " + response)
            if (response === "true") {
                document.getElementById('availabilityCheckbox').checked = true
            } else {
                document.getElementById('availabilityCheckbox').checked = false
            }
        },
        error: function (response) {
            console.log("Server response: " + response)
        }
    })
}

function buildPostDetailsData() {
    console.log("Global post title: " + JSON.stringify(global_postTitle))
    console.log("Global author picture path: " + JSON.stringify(global_authorPicturePath))
    console.log("Global author name: " + JSON.stringify(global_authorName))
    console.log("Global author surname: " + JSON.stringify(global_authorSurname))
    console.log("Global reaction counts: " + JSON.stringify(global_reactionCounts))
    console.log("Global availability: " + JSON.stringify(global_availability))
    console.log("Global post comments: " + JSON.stringify(global_postComments))
    return new PostDetailsData(
        global_postTitle,
        global_authorPicturePath,
        global_authorName,
        global_authorSurname,
        global_reactionCounts,
        global_availability,
        global_postComments
    )
}