// A global variable that will contain the result of the database query with all the resources,
// ordered alphabetically by title
const allResources = []

hideSearchBarEventListeners()
window.addEventListener('load', queryDatabase)
// Get the text input and the search results container
let textInput = document.getElementById("resourceSearchBar")
let searchResultsContainer = document.querySelector('.searchResultsContainer')
// Add an event listener to the text input
textInput.addEventListener('click', function () {
    // Display the search results container when the text input is clicked
    searchResultsContainer.style.display = 'block'
})
textInput.addEventListener('input', searchResources)

// The blur event is called when an element loses focus.
// Differently from the focusout event, the blur event
// doesn't bubble, which means it isn't propagated.
/* textInput.addEventListener('blur', function () {
    searchResultsContainer.style.display = 'none'
}) */

// FUNCTIONS

function queryDatabase() {
    $.ajax({
        url: "fetch_searched_resources.php",
        type: "GET",
        success: function (data) {
            // Parse the JSON string into a JavaScript object
            let resources = JSON.parse(data)
            // Add the resources to the allResources array
            allResources.push(...resources)
            console.log("All fetched resources:" + JSON.stringify(resources))
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + ' ' + errorThrown)
        }
    })
}

/**
 * Function that dynamically adjusts the results searched by the user
 * @param {HTMLInputElement} textInput The text input element
 */
function searchResources() {
    // Get the text input value
    let textInputValue = textInput.value.toLowerCase()

    // Clear the table data
    clearTableData()

    // Filter the resources that contain the text input value in their title
    if (textInputValue !== "") {
        searchResultsContainer.style.display = 'block'
        let filteredResources = allResources.filter(resource => resource.resourceName.toLowerCase().includes(textInputValue))
        // Display the filtered resources in the search results container
        filteredResources.forEach(resource => insertLine(convertResourceToLine(resource)))
    } else {
        searchResultsContainer.style.display = 'none'
    }
}

/**
 * Resources are fetched by the database as JSON objects and have the following structure:
 * {
 *    "resourceName": the name of the file
 *    "name": the name of the author
 *    "surname": the surname of the author
 *    "filePath": the path to the file
 *    "subject": the subject this resource is related to
 * }
 * @param {JSON} resource A JSON object representing a resource
 * @returns {Array} An array containing the values of the resource to be inserted in the table
 */
function convertResourceToLine(resource) {
    let line = []
    let linkToResource = document.createElement('a')
    linkToResource.href = resource.filePath
    linkToResource.target = "_blank"
    linkToResource.textContent = resource.resourceName
    line.push(linkToResource)
    line.push(resource.name + " " + resource.surname)
    line.push(resource.subject)
    return line
}

/**
 * Inserts a line into the table.
 * @param {Array} line A line containing a link to a resource, an author full name and
 * the subject this resource is related to.
 */
function insertLine(line) {
    let table = document.getElementById("table")
    let row = table.insertRow(-1)
    for (let i = 0; i < line.length; i++) {
        let cell = row.insertCell(i)
        if (line[i] instanceof HTMLElement) {
            // If the item is a DOM element, append it to the cell
            cell.appendChild(line[i])
        } else {
            // Otherwise, set the innerHTML of the cell to the item
            cell.innerHTML = line[i]
        }
    }
}

function clearTableData() {
    let table = document.getElementById("table")
    // Start from the end of the table and remove each row until only the header row is left
    for (let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}

function hideSearchBarEventListeners() {
    // Get the search results container
    let searchResultsContainer = document.querySelector('.searchResultsContainer')

    // Add a click event listener to the document
    document.addEventListener('click', function () {
        // Hide the search results container
        searchResultsContainer.style.display = 'none'
    })

    // Add a click event listener to the search results container
    searchResultsContainer.addEventListener('click', function (event) {
        // Stop the propagation of the click event
        event.stopPropagation()
    })
    
    let textInput = document.getElementById("resourceSearchBar")

    // Add a click event listener to the text input
    textInput.addEventListener('click', function (event) {
        // Stop the propagation of the click event
        event.stopPropagation()
    })
}