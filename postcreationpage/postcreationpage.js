"use strict"

const meetingTypes = {
    STUDY: 'study-meeting',
    HANGOUT: 'hangout'
}
const timeType = {
    START: 'dalle ore',
    END: 'alle ore'
}
let numberOfAvailabilities = 1

document.getElementById('addAvailability').addEventListener('click', function() {
    let container = document.getElementById('availabilitiesList')
    let li = document.createElement('li')
    li.appendChild(createFieldset(container, li))
    container.appendChild(li)
})

document.getElementById('meeting-type').addEventListener('change', toggleSubjectInput)

/**
 * Creates a fieldset with a legend and three inputs: date, start time and end time.
 * @param {HTMLUListElement} container the container of the availability
 * @param {HTMLLIElement} li the availability to remove
 * @returns {HTMLFieldSetElement} the created fieldset
 */
function createFieldset(container, li) {
    let fieldset = document.createElement('fieldset')
    let legend = document.createElement('legend')
    legend.textContent = 'Disponibilità ' + ++numberOfAvailabilities + ':'

    fieldset.appendChild(legend)
    fieldset.appendChild(createDateInputAndLabel())
    fieldset.appendChild(createTimeInputAndLabel(timeType.START))
    fieldset.appendChild(createTimeInputAndLabel(timeType.END))
    fieldset.appendChild(createRemoveButton(container, li))
    return fieldset
}

/**
 * Creates a label with an input of type date.
 * @returns {HTMLLabelElement} a label with an input of type date
 */
function createDateInputAndLabel() {
    let label = document.createElement('label')
    label.textContent = 'Data:'
    let input = document.createElement('input')
    input.type = 'date'
    input.name = 'availabilityDate[]'
    input.required = true
    label.appendChild(input)
    return label
}

/**
 * Creates a label with an input of type time.
 * @param {string} tType a string representing the time type (e.g. 'dalle ore', 'alle ore') 
 * @returns {HTMLLabelElement} a label with an input of type time
 */
function createTimeInputAndLabel(tType) {
    let label = document.createElement('label')
    label.textContent = tType
    let input = document.createElement('input')
    input.type = 'time'
    input.name = tType === timeType.START ? 'startTime[]' : 'endTime[]'
    input.required = true
    label.appendChild(input)
    return label
}

/**
 * Creates a button that removes the availability.
 * @param {HTMLUListElement} container the container of the availability
 * @param {HTMLLIElement} li the availability to remove
 * @returns {HTMLButtonElement} a button that removes the availability
 */
function createRemoveButton(container, li) {
    let button = document.createElement('button')
    button.textContent = 'Rimuovi'
    button.type = 'button'
    button.addEventListener('click', function() {
        container.removeChild(li)
        numberOfAvailabilities--
    })
    return button
}

/**
 * If the meeting is to study, alert the user to choose a subject from
 * the list.
 */
function validateForm() {
    let meetingType = document.getElementById('meeting-type').value
    let selectElement = document.getElementById('subjectInput')
    if (selectElement.value === '' && meetingType === meetingTypes.STUDY) {
        alert('Per favore, seleziona una materia da studiare durante l\'incontro')
        return false
    }
    return true
}

/**
 * Toggles the subject input field based on the meeting type.
 */
function toggleSubjectInput() {
    let selectElement = document.getElementById('subjectInput')
    let meetingType = document.getElementById('meeting-type').value
    selectElement.disabled = meetingType !== meetingTypes.STUDY
}
