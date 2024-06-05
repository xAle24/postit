function addLine(line) {
    let table = document.getElementById("table")
    let row = table.insertRow(-1)
    for (let i = 0; i < line.length; i++) {
        let cell = row.insertCell(i)
        cell.innerHTML = line[i]
    }
}