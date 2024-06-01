// adds a new row to the table when button clicked
document.getElementById("addRow").addEventListener("click", processAddRow);

// computes the percent grade when a text input is changed
const inputs = document.querySelectorAll('input[type="text"]');
inputs.forEach(input => input.addEventListener("change", processTxtInput));

// computes the total weighted grade for all rows
var input = document.getElementById("weighted");
input.addEventListener("click", processWeightedGrade);

// computes the mean grade for all rows
var input = document.getElementById("mean");
input.addEventListener("click", processMeanGrade);

function processMeanGrade() {
    var table = document.getElementById("table");
    var rows = table.rows;
    var total = 0;
    for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        var content = row.cells[4].textContent;
        total += parseFloat(content);
    }
    var mean = total/(rows.length-1);
    document.getElementById("result").textContent = mean.toFixed(2) + "%";
}

function processWeightedGrade() {
    var table = document.getElementById("table");
    var rows = table.rows;
    var totalPerecent = 0.0;
    var totalWeight = 0.0;

    for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        var percent = parseFloat(row.cells[4].textContent);

        var weightInput = row.querySelector('.weight');
        var weight = weightInput!=null ? parseFloat(weightInput.value) : 0;

        totalPerecent += percent * weight;
        totalWeight += weight;
    }
    var total = totalPerecent / totalWeight;
    document.getElementById("result").textContent = total.toFixed(2) + "%";
}

function processAddRow(evt) {
    var table = document.getElementById("table");
    var lastRow = table.rows[table.rows.length - 1];
    var newRow = lastRow.cloneNode(true);
    const inputs = newRow.querySelectorAll('input[type="text"]');
    inputs.forEach(input => input.addEventListener("change", processTxtInput));
    newRow.cells[0].innerHTML = "Activity " + table.rows.length;
    newRow.cells[1].innerHTML = "A" + table.rows.length;
    table.appendChild(newRow);
}

function processTxtInput(evt) {
    var table = document.getElementById("table");
    var rows = table.rows;
    for(var i = 0; i < rows.length; i++) {
        var row = rows[i];
    
        // Get the numerator and denominator inputs
        var gradeCell = row.cells[3];
        var numeratorInput = gradeCell.querySelector('.gradeNumer');
        var denominatorInput = gradeCell.querySelector('.gradeDenom');
    
        // Check if inputs are found
        if (numeratorInput && denominatorInput) {
            var numerator = numeratorInput.value;
            var denominator = denominatorInput.value;
    
            // Example of how to compute percent or perform any other operations
            var percent = (parseInt(numerator) / parseInt(denominator)) * 100;
    
            // Update the percent cell
            var percentCell = row.cells[4];
            percentCell.textContent = percent.toFixed(2);
        }
    }
}