let fetchedCurrentPostDetailsData

function fetchPostDetails() {
    fetch('fetchPostDetails.php')
        .then(response => response.json())
        .then(response => console.log("Server response: " + JSON.stringify(response)))
}

function updateDatabase() {
    // Check if the details are ok
    if (newDetailsData.userEmail === null) {
        throw new Error("User email is null, in function updateDatabase in file postdetails/dbinteraction.js")
    }
    $.ajax({
        type: "post",
        url: "addReaction.php",
        data: {
            selectedReaction: newDetailsData.selectedReaction,
            addedComments: newDetailsData.addedComments,
            addedAvailability: newDetailsData.addedAvailability,
            userEmail: newDetailsData.userEmail
        },
        success: function(response) {
            console.log("Server response: " + response)
        },
        error: function(response) {
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
        })
}

function fetchReactionCounts() {
    fetch('fetchReactionCounts.php')
        .then(response => response.json())
        .then(response => {
            console.log("Server response: " + JSON.stringify(response))
            // TODO: populate the global variable fetchedCurrentPostDetailsData
        })
}

function fetchAvailability() {
    fetch('fetchAvailability.php')
        .then(response => response.json())
        .then(response => {
            console.log("Server response: " + JSON.stringify(response))
            // TODO: populate the global variable fetchedCurrentPostDetailsData
        })
}

function fetchComments() {
    fetch('fetchComments.php')
        .then(response => response.json())
        .then(response => {
            console.log("Server response: " + JSON.stringify(response))
            // TODO: populate the global variable fetchedCurrentPostDetailsData
        })
}