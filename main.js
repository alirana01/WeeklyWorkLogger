// main.js
document.getElementById('configure').addEventListener('click', function() {
    chrome.tabs.create({url: 'configuration.html'});
});

// Add any other JavaScript code for your popup here
