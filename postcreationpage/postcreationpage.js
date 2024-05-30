let numberOfAvailabilities = 1

document.getElementById('addAvailability').addEventListener('click', function() {
    var container = document.getElementById('availabilitiesList')
    var li = document.createElement('li')
    var label = document.createElement('label')
    label.textContent = 'Disponibilità ' + ++numberOfAvailabilities + ':'
    var input = document.createElement('input')
    input.type = 'datetime-local'
    input.name = 'availabilities'
    input.required = true
    label.appendChild(input)
    li.appendChild(label)
    container.appendChild(li)
})
