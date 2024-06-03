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

            // Call createNewResourceEntry for each resource
            for (var i = 0; i < resources.length; i++) {
                createNewResourceEntry(resources[i].fileName, resources[i].href)
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + ' ' + errorThrown)
        }
    })
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
 * @param {string} fileName 
 * @param {string} href 
 */
function createNewResourceEntry(fileName, href) {
    let a = document.createElement('a')
    let container = document.getElementById('myResourcesNav')
    a.href = href
    a.textContent = fileName
    container.appendChild(a)
}