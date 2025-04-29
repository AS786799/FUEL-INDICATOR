var presentkm = document.getElementById("present");
var distance = document.getElementById("dist-travel");
var result1 = document.getElementById("result1"); 
var mileage = document.getElementById("mileage");
var fuelconsumed = document.getElementById("fuel-consumed");
var fuelfilled = document.getElementById("fuel-filled");
var balance = document.getElementById("balance");
var fuelconsumedfortrip = document.getElementById("fuel-consumed-for-trip");
var vehiclemileage = document.getElementById("vehicle-mileage");
var totaldistancetravelled = document.getElementById("total-travelled");

function add() {
    var input1 = Number(presentkm.value);
    var input2 = Number(distance.value);

    if (isNaN(input1) || isNaN(input2)) {
        return; 
    }

    var total = input1 + input2;
    result1.value = total.toFixed(2); 

    find();
}

function find() {
    var input3 = Number(distance.value);
    var input4 = Number(mileage.value);

    if (isNaN(input3) || isNaN(input4) || input4 === 0) {
        return; 
    }

    var fuel = input3 / input4;
    fuelconsumed.value = fuel.toFixed(2); 

    calculation();
}

function calculation() {
    var input5 = Number(fuelfilled.value);
    var input6 = Number(fuelconsumed.value);

    if (isNaN(input5) || isNaN(input6)) return;

    var finalresult = input5 - input6;

    if (finalresult < 0) {
        balance.value = "";
        return;
    }

    balance.value = finalresult.toFixed(2);

    if (finalresult <= 0.30) {
        console.log("Fuel is low. Sending SMS...");

        fetch('send-alert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fuel: finalresult.toFixed(2),
                vehicle: document.getElementById("vehicle-name").value
            })
        })
        .then(response => response.json())
        .then(data => console.log(data.message))
        .catch(error => console.error("Error sending alert:", error));
    }
}

