const subjects = []

window.addEventListener('load', function() {
    fetchExistingSubjects()
})

/**
 * Function called on window load. Fetches existing subjects in the database,
 * and uses the entries to populate the datalist associated with
 * the #subjectInput input field.
 */
function fetchExistingSubjects() {
    fetch('fetch_subjects.php')
    .then(response => response.json())
    .then(subjects => {
        // Get a reference to the datalist
        var select = document.getElementById('subjectInput');

        // Create a new option element for each subject
        for (var i = 0; i < subjects.length; i++) {
            var option = document.createElement('option')
            console.log(subjects[i])
            option.value = subjects[i].name
            option.textContent = subjects[i].name
            select.appendChild(option)
        }
    })
}

function tryToSubmitData() {
    if (!validateForm()) {
        return
    }
    $.ajax({
        type: "post",
        url: "postcreation.php",
        data: $("#postCreationForm").serialize(),
        success: function() {
            console.log("Submission handled successfully!")
            document.getElementById('postCreationForm').reset()
            alert("Post creato correttamente!")
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error in submission: " + textStatus + " " + errorThrown)
        }
    })
}