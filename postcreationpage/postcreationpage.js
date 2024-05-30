"use strict"

let numberOfAvailabilities = 1

document.getElementById('addAvailability').addEventListener('click', function() {
    let container = document.getElementById('availabilitiesList')
    let li = document.createElement('li')
    li.appendChild(createFieldset(container, li))
    container.appendChild(li)
})

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
    fieldset.appendChild(createTimeInputAndLabel('dalle ore'))
    fieldset.appendChild(createTimeInputAndLabel('alle ore'))
    fieldset.appendChild(createRemoveButton(container, li))
    return fieldset
}

// TODO: understand how to create unique ids

/**
 * Creates a label with an input of type date.
 * @returns {HTMLLabelElement} a label with an input of type date
 */
function createDateInputAndLabel() {
    let label = document.createElement('label')
    label.textContent = 'Data:'
    let input = document.createElement('input')
    input.type = 'date'
    input.name = 'availabilityDate'
    input.required = true
    label.appendChild(input)
    return label
}

/**
 * Creates a label with an input of type time.
 * @param {string} timeType a string representing the time type (e.g. 'dalle ore', 'alle ore') 
 * @returns {HTMLLabelElement} a label with an input of type time
 */
function createTimeInputAndLabel(timeType) {
    let label = document.createElement('label')
    label.textContent = timeType
    let input = document.createElement('input')
    input.type = 'time'
    input.name = 'startTime'
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
