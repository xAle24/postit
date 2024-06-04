let fileInput = document.getElementById('fileInput')
let fileList = document.getElementById('fileList')
let numOfFiles = document.getElementById('numOfFiles')
let submitInput = document.getElementById('submitInput')
let objectURLs = [] // Array to store the object URLs


// TODO: ensure that only the resources created by the current user are displayed
/**
 * Function called when the page loads. Queries the database 
 * for the resources and creates a new entry for each one.
 */
window.onload = function() {
    $.ajax({
        url: 'fetch_resources.php',
        type: 'GET',
        success: function(data) {
            // Parse the JSON data returned by the PHP script
            var resources = JSON.parse(data)
            console.log("RESOURCES:" + resources)
            
            // Call createNewResourceEntry for each resource
            for (var i = 0; i < resources.length; i++) {
                createNewResourceEntry(resources[i].resourceName, "../database-content/uploads/" + resources[i].resourceName)
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + ' ' + errorThrown)
        }
    })
    fetchExistingSubjects()
}

fileInput.addEventListener('change', function() {
    fileList.innerHTML = ''
    let files = fileInput.files
    numOfFiles.textContent = `${files.length} file selezionat` + (files.length > 1 ? 'i' : 'o')

    for (let i of files) {
        console.log(i)
        let li = document.createElement('li')
        let fileName = i.name
        let fileSize = (i.size / 1024).toFixed(1)
        let fileSizeMeasureUnit = 'KB'
        if (fileSize > 1024) {
            fileSize = (fileSize / 1024).toFixed(1)
            fileSizeMeasureUnit = 'MB'
        }

        // Create an object URL for the file
        let fileURL = URL.createObjectURL(i)
        objectURLs.push(fileURL)
        // Creates a clickable link that brings the user to a new tab, where the file is displayed
        li.innerHTML = `<p><a href="${fileURL}" target="_blank">${fileName}</a></p><p>(${fileSize} ${fileSizeMeasureUnit})</p>`
        fileList.appendChild(li)
    }
    let submitInput = document.getElementById('submitInput')
    submitInput.style.display = 'block'
    let cancelButton = document.getElementById('cancelButton')
    cancelButton.style.display = 'block'
})

// Revoke the object URLs when the user navigates away from the page
window.onbeforeunload = cancelUpload()

/**
 * Revoke the object URLs created for the files, to free up memory.
 */
function revokeURLs() {
    for (let url of objectURLs) {
        URL.revokeObjectURL(url)
    }
}

/**
 * Function called when the user clicks the "Annulla" button.
 * It clears the file input and the list of files.
 * It also hides the submit and cancel buttons.
 */
function cancelUpload() {
    fileInput.value = null
    fileList.innerHTML = ''
    numOfFiles.textContent = "Nessun file selezionato"
    revokeURLs()
    let submitInput = document.getElementById('submitInput')
    submitInput.style.display = 'none'
    let cancelButton = document.getElementById('cancelButton')
    cancelButton.style.display = 'none'
}

/**
 * Creates a new clickable link in the nav list of resources.
 * This should be called on the success of the AJAX request.
 * @param {string} fileName The name of the file to visit.
 * @param {string} href A link to the correct file in the uploads folder.
 * In a real application, this should point to an actual location on the internet.
 */
function createNewResourceEntry(fileName, href) {
    let resourceContainerTemplate = document.createElement('template')
    resourceContainerTemplate.innerHTML = resourceElementTemplate // from templates.js
    
    let a = resourceContainerTemplate.content.querySelector('a')
    a.href = href
    a.textContent = fileName
    a.target = '_blank' // to navigate to another tab

    let button = resourceContainerTemplate.content.querySelector('button')
    button.addEventListener('click', removeResource)

    // Adding event listeners to show and hide the delete button
    let div = resourceContainerTemplate.content.querySelector('.singleResourceContainer')
    //div.addEventListener('mouseover', displayDeleteButton)
    //div.addEventListener('mouseout', hideDeleteButton)

    let container = document.getElementById('myResourcesNav')
    container.appendChild(resourceContainerTemplate.content)
}

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

function validateForm() {
    let subject = document.getElementById('subjectInput').value
    let descriptionTextArea = document.getElementById('descriptionInput').value
    let files = fileInput.files
    if (subject === '' || descriptionTextArea === '' || files.length === 0) {
        alert('Devi compilare tutti i campi e selezionare almeno un file')
        return false
    }
    return true
}

function removeResource() {
    console.log('Removing resource')
    console.log("Button parent: " + this.parentElement)
    let singleResourceContainer = this.parentElement
    let resourceName = singleResourceContainer.querySelector('a').textContent
    console.log("Resource name: " + resourceName)

    // Send an AJAX request to the server to remove the resource
    $.ajax({
        url: 'remove_resource.php',
        type: 'POST',
        data: { 
            resourceFilePath: "../database-content/uploads/" + resourceName,
            resourceName: resourceName
        },
        success: function(data) {
            console.log('Resource removed successfully')
            // Remove the resource from the page
            singleResourceContainer.remove()
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + ' ' + errorThrown)
        }
    })
}

function displayDeleteButton() {
    let deleteButton = this.querySelector('button')
    deleteButton.style.display = 'block'
}

function hideDeleteButton() {
    let deleteButton = this.querySelector('button')
    deleteButton.style.display = 'none'
}