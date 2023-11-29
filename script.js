// Function to get URL parameter by name
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

var jsonData; // Variable to hold JSON data

// Function to find and display data based on the key
function displayDetails(key) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType('application/json');
    xhr.open('GET', 'data.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            jsonData = JSON.parse(xhr.responseText);
            updateSeat(key);
            findAndDisplay(key);
        }
    };
    xhr.send(null);
}

function updateSeat(key) {
    // Create a new XMLHttpRequest object
var xhr = new XMLHttpRequest();

// Define the file URL
var url = 'https://mahwish-dev.github.io/data.json';

// Open a GET request to fetch the existing JSON data
xhr.open('GET', url, true);

// Set the responseType to 'json' for proper handling
xhr.responseType = 'json';

// Send the GET request
xhr.send();

// When the request is complete
xhr.onreadystatechange = function() {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {

        
        // Get the existing JSON data
        var tempJsonData = xhr.response;
        var index = tempJsonData.invitees.adm_no.indexOf(parseInt(key));
      
        // get current seat
        var seatNumber = tempJsonData.currentSeatIdx;

         // Update the specific value 
        tempJsonData.invitees.seat[index] = seatNumber; // Set the new value here

        // Convert the updated JSON data to a string
        var updatedJsonString = JSON.stringify(tempJsonData);

        // Create another XMLHttpRequest for writing the updated JSON back to the file
        var xhrWrite = new XMLHttpRequest();

        // Open a POST request to write the updated JSON data
        xhrWrite.open('POST', url, true);

        // Set the Content-Type header
        xhrWrite.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        // Send the updated JSON data
        xhrWrite.send(updatedJsonString);
        
        // When the write request is complete
        xhrWrite.onreadystatechange = function() {
            if (xhrWrite.readyState === XMLHttpRequest.DONE) {
            if (xhrWrite.status === 200) {
                console.log('JSON file updated successfully!');
            } else {
                console.log('Error updating JSON file');
            }
            }
        };
        } else {
        console.log('Failed to fetch JSON data');
        }
    }
};

}

// Function to find and display data based on the key
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