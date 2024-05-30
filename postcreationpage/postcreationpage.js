let numberOfAvailabilities = 1

document.getElementById('addAvailability').addEventListener('click', function() {
    var container = document.getElementById('availabilitiesList')
    var li = document.createElement('li')
    li.appendChild(createFieldset())
    container.appendChild(li)
})

/**
 * Creates a fieldset with a legend and three inputs: date, start time and end time.
 * @returns {HTMLFieldSetElement} the created fieldset
 */
function createFieldset() {
    var fieldset = document.createElement('fieldset')
    var legend = document.createElement('legend')
    legend.textContent = 'Disponibilità ' + ++numberOfAvailabilities + ':'
    fieldset.appendChild(legend)
    fieldset.appendChild(createDateInputAndLabel())
    fieldset.appendChild(createTimeInputAndLabel('dalle ore'))
    fieldset.appendChild(createTimeInputAndLabel('alle ore'))
    return fieldset
}

// TODO: understand how to create unique ids

/**
 * Creates a label with an input of type date.
 * @returns {HTMLLabelElement} a label with an input of type date
 */
function createDateInputAndLabel() {
    var label = document.createElement('label')
    label.textContent = 'Data:'
    var input = document.createElement('input')
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
    var label = document.createElement('label')
    label.textContent = timeType
    var input = document.createElement('input')
    input.type = 'time'
    input.name = 'startTime'
    input.required = true
    label.appendChild(input)
    return label
}
