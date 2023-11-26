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

// Your JSON data
var jsonData = {
    "invitees": {
        "names": ["abc", "ganji chudail", "xyz"],
        "adm_no": [39211, 69, 25717],
        "section": ["B", "Z", "A"]
    }
};

// Function to find and display data based on the key
function displayDetails(key) {
    var index = jsonData.invitees.adm_no.indexOf(parseInt(key));
    if (index !== -1) {
        var name = jsonData.invitees.names[index];
        var admNo = jsonData.invitees.adm_no[index];
        var section = jsonData.invitees.section[index];
        
        // Display the data on your subsite
        document.getElementById('name').innerText = "NAME: " + name.toUpperCase();
        document.getElementById('admNo').innerText = "TICKET NO: " + admNo;
        document.getElementById('section').innerText = "SECTION: " + section.toUpperCase();
    } else {
        // Handle case where key is not found
        console.log("Key not found");
    }
}

// Call the function to display details using the extracted key
displayDetails(key);