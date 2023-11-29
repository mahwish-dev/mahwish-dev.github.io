function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Get the key parameter from the URL
var key = getParameterByName('key');
console.log(key);

var url = 'data.json';
var jsonData; // Variable to hold JSON data

// Function to find and display data based on the key
function displayDetails(key) {
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch JSON data');
            }
        })
        .then(data => {
            jsonData = data;
            updateSeat(key);
            findAndDisplay(key);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function updateSeat(key) {
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch JSON data');
            }
        })
        .then(tempJsonData => {
            var index = tempJsonData.invitees.adm_no.indexOf(parseInt(key));
            var seatNumber = tempJsonData.currentSeatIdx;

            if (index !== -1) {
                tempJsonData.invitees.seat[index] = seatNumber;

                return fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify(tempJsonData)
                });
            } else {
                throw new Error('Key not found');
            }
        })
        .then(response => {
            if (response.ok) {
                console.log('JSON file updated successfully!');
            } else {
                throw new Error('Error updating JSON file');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function findAndDisplay(key) {
    var index = jsonData.invitees.adm_no.indexOf(parseInt(key));
    if (index !== -1) {
        var name = jsonData.invitees.names[index];
        var admNo = jsonData.invitees.adm_no[index];
        var section = jsonData.invitees.section[index];
        var seat = jsonData.invitees.seat[index];

        // Display the data on your subsite
        document.getElementById('name').innerText = "NAME: " + name.toUpperCase();
        document.getElementById('admNo').innerText = "TICKET NO: " + admNo;
        document.getElementById('section').innerText = "SECTION: " + section.toUpperCase();
        document.getElementById('class').innerText = "SEAT NO: " + seat;
    } else {
        // Handle case where key is not found
        console.log("Key not found");
    }
}

// Call the function to display details using the extracted key
displayDetails(key);