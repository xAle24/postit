let fileInput = document.getElementById('fileInput')
let fileList = document.getElementById('fileList')
let numOfFiles = document.getElementById('numOfFiles')
let submitInput = document.getElementById('submitInput')
let objectURLs = [] // Array to store the object URLs

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

function revokeURLs() {
    for (let url of objectURLs) {
        URL.revokeObjectURL(url)
    }
}

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