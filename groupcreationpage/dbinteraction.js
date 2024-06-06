window.onload = fetchExistingGroups

function fetchExistingGroups() {
    fetch('fetch_group.php')
    .then(response => response.json())
    .then(groups => {
        // Get a reference to the datalist
        var select = document.getElementById('groupInput')
        console.log(groups)
        // Create a new option element for each group
        for (var i = 0; i < groups.length; i++) {
            var option = document.createElement('option')
            console.log(groups[i])
            option.value = groups[i].name
            option.textContent = groups[i].name
            select.appendChild(option)
        }
    })
}

function tryToSubmitData() {
    $.ajax({
        type: "post",
        url: "groupcreation.php",
        data: $("#groupCreationForm").serialize(),
        success: function() {
            console.log("Submission handled successfully!")
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error in submission: " + textStatus + " " + errorThrown)
        }
    })
}
